import { Context } from "config"
import { MutationCreateFormArgs } from "config/models"

export const createForm = async (parent: void, args: MutationCreateFormArgs, context: Context) => {
	const { otherURLs, portfolioURL, ...data } = args.input
	const document = {
		otherURLs: otherURLs.map(url => url.href),
		portfolioURL: portfolioURL?.href,
		...data,
		ip: context.ip,
		date: new Date(Date.now() + 1000 * 60 * 60 * 9).toISOString(),
	}
	const { insertedId: formId } = await context.db.collection("form").insertOne(document)
	return {
		__typename: "Form",
		...document,
		formId,
		extensions: {
			message: `${args.input.club} 동아리 지원서 제출 (학번 : ${args.input.studentId})`,
			action: "동아리 지원서 제출",
			club: args.input.club,
		},
	}
}
