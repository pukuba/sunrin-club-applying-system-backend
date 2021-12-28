import { shield, rule, and } from "graphql-shield"
import { Context, redis } from "config"
import { ApolloError, UserInputError } from "apollo-server-express"
import { CreateFormInput } from "resolvers/app/apply/models"
import { validEmotion } from "./validForm"

const isValidForm = rule()(async (parent: void, args: CreateFormInput, context: Context) => {
	if (args.input.club === "emotion") return validEmotion(args.input.answerList)
	else return true
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

export const permissions = shield(
	{
		Mutation: {
			createForm: and(isValidForm, canSubmit),
		},
		Query: {},
	},
	{ allowExternalErrors: true }
)
