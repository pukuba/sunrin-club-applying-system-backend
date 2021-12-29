import { shield, rule, and } from "graphql-shield"
import { Context, redis, RequiredContext } from "config"
import { ApolloError, UserInputError } from "apollo-server-express"
import { MutationCreateFormArgs, MutationSendMessageArgs } from "config/models"
import { validEmotion } from "./validForm"

const isValidForm = rule()(async (parent: void, args: MutationCreateFormArgs, context: Context) => {
	if (args.input.club === "emotion") return validEmotion(args.input.answerList)
	else return true
})

const canSMS = rule()(async (parent: void, args: MutationSendMessageArgs, context: RequiredContext) => {
	const key = `sms:${context.user.role}`
	const count = await redis.get(key)
	if (count === null) {
		await redis.setex(key, 600, "1")
		return true
	}
	if (args.input.phoneNumberList.length > 80) {
		return new UserInputError("최대 100개의 번호만 입력 가능합니다")
	}
	if (parseInt(count, 10) < 3) {
		await redis.incr(key)
		return true
	}
	return new ApolloError("전송 횟수 제한")
})

const canSubmit = rule()(async (parent: void, args: void, context: Context) => {
	const ip = context.ip
	const redisRes = await context.redis.get(`canSubmit:${ip}`)
	if (redisRes === null) {
		await context.redis.setex(`canSubmit:${ip}`, 60, "1")
	} else if (parseInt(redisRes, 10) >= 5) {
		const ttl = await redis.ttl(`canSubmit:${ip}`)
		return new ApolloError(`너무 많이 요청했습니다. ${ttl} 초 동안 요청할 수 없습니다`)
	} else {
		await context.redis.incr(`canSubmit:${ip}`)
	}
	return true
})

const isValidGetFormByClub = rule()(async (parent: void, args: { club: string }, context: Context) => {
	const id = context.user?.id
	const role = context.user?.role
	if (role === "teacher" || role === args.club) {
		const ret = (await context.db.collection("user").findOne({ id: id })) !== null
		return ret
	}
	return false
})

const isValidUser = rule()(async (parent: void, args: void, context: Context) => {
	const id = context.user?.id
	const role = context.user?.role
	if (role) {
		const ret = (await context.db.collection("user").findOne({ id: id })) !== null
		return ret
	}
	return false
})

export const permissions = shield(
	{
		Mutation: {
			createForm: and(isValidForm, canSubmit),
			sendMessage: and(isValidUser, canSMS),
		},
		Query: {
			getFormByClub: isValidGetFormByClub,
			getFormByStudentId: isValidUser,
			getStudentByClub: isValidGetFormByClub,
		},
	},
	{ allowExternalErrors: true }
)
