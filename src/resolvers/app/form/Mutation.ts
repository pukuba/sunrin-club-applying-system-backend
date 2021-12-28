import { Context } from "config"
import { CreateFormInput } from "./models"

export const createForm = async (parent: void, args: CreateFormInput, context: Context) => {
	const { otherURLs, portfolioURL, ...data } = args.input
	const document = {
		otherURLs: otherURLs.map(url => url.href),
		portfolioURL: portfolioURL?.href,
		...data,
		date: new Date(Date.now() + 1000 * 60 * 60 * 9).toISOString(),
	}
	const { insertedId: formId } = await context.db.collection("form").insertOne(document)
	return { ...document, formId }
}
