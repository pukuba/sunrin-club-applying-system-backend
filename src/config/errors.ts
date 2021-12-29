import { GraphQLError } from "graphql"
import { Db } from "mongodb"
import { mongoDB, redis } from "./connectDB"

export const formatError = (error: GraphQLError) => {
	if (error.extensions?.action) {
		const date = new Date(Date.now() + 1000 * 60 * 60 * 9).toISOString()
		const { code, exception, ...data } = error.extensions
		const log = {
			...data,
			date,
			status: false,
		}
		mongoDB.get().then(async db => {
			await (db as Db).collection("history").insertOne(log)
		})
		;(error.extensions as { [key: string]: any } | undefined) = { code, exception }
	}
	return error
}
