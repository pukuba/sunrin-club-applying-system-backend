import { Context } from "config"
import { MutationCreateFormArgs } from "config/models"
import { ForbiddenError } from "apollo-server-express"
import { decodeVerifyToken } from "lib"

export const createForm = async (parent: void, args: MutationCreateFormArgs, context: Context) => {
	const { otherURLs, portfolioURL, verifyToken, ...data } = args.input
	const tokenInfo = decodeVerifyToken(args.input.verifyToken)
	if (tokenInfo === null) {
		throw new ForbiddenError("verifyToken이 유효하지 않습니다")
	}
	const document = {
		otherURLs: otherURLs.map(url => url.href),
		portfolioURL: portfolioURL?.href,
		...data,
		ip: context.ip,
		date: new Date(Date.now() + 1000 * 60 * 60 * 9).toISOString(),
	}
	const { insertedId: formId } = await context.db.collection("form").insertOne(document)
	await context.redis.setex(`blacklist:${verifyToken}`, tokenInfo.exp - Date.now() / 1000, "")
	return { ...document, formId }
}
