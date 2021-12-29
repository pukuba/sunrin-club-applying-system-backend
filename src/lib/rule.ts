import { Context, redis, RequiredContext } from "config"
import { rule } from "graphql-shield"
import { ApolloError, UserInputError } from "apollo-server-express"
import { MutationCreateFormArgs, MutationSendMessageArgs } from "config/models"
import { validEmotion } from "./validForm"

export const isValidForm = rule()(async (parent: void, args: MutationCreateFormArgs, context: Context) => {
	if (args.input.club === "emotion") return validEmotion(args.input.answerList)
	else return true
})

export const canSMS = rule()(async (parent: void, args: MutationSendMessageArgs, context: RequiredContext) => {
	const key = `sms:${context.user.role}`
	const count = await redis.get(key)
	const extensions = {
		ip: context.ip,
		action: "메세지 전송",
		role: context.user.role,
	}
	if (args.input.phoneNumberList.length > 80) {
		return new ApolloError("전송할 수 있는 최대 개수는 80개 입니다", undefined, {
			...extensions,
			message: `메세지 전송 개수 초과 (${args.input.phoneNumberList.length} / 80)`,
		})
	}
	if (count === null) {
		await redis.setex(key, 600, "1")
		return true
	} else if (parseInt(count, 10) < 3) {
		await redis.incr(key)
		return true
	}

	return new ApolloError("전송은 600초당 최대 3번 가능합니다", undefined, {
		...extensions,
		message: `메세지 전송 횟수 초과 (${count} / 3)`,
	})
})

export const canSubmit = rule()(async (parent: void, args: MutationCreateFormArgs, context: Context) => {
	const ip = context.ip
	const redisRes = await context.redis.get(`canSubmit:${ip}`)
	if (redisRes === null) {
		await context.redis.setex(`canSubmit:${ip}`, 60, "1")
	} else if (parseInt(redisRes, 10) >= 10) {
		const ttl = await redis.ttl(`canSubmit:${ip}`)
		return new ApolloError(`너무 많이 요청했습니다. ${ttl} 초 동안 요청할 수 없습니다`, undefined, {
			ip,
			action: "지원서 제출",
			message: `요청 횟수 초과 (학번 : ${args.input.studentId})`,
			role: "student",
			club: args.input.club,
		})
	} else {
		await context.redis.incr(`canSubmit:${ip}`)
	}
	return true
})

export const isValidGetFormByClub = rule()(async (parent: void, args: { club: string }, context: Context) => {
	const id = context.user?.id
	const role = context.user?.role
	if (role === "teacher" || role === args.club) {
		const ret = (await context.db.collection("user").findOne({ id: id })) !== null
		return ret
	}
	return false
})

export const isValidUser = rule()(async (parent: void, args: void, context: Context) => {
	const id = context.user?.id
	const role = context.user?.role
	if (role) {
		const ret = (await context.db.collection("user").findOne({ id: id })) !== null
		return ret
	}
	return false
})
