import { ApolloServerPluginUsageReporting } from "apollo-server-core"
import { env } from "config/env"
import { Db } from "mongodb"
import { mongoDB } from "./connectDB"
import { ApolloServerPlugin, GraphQLRequestListener } from "apollo-server-plugin-base"
import { ApolloError } from "apollo-server-errors"

export const logOptions = [
	ApolloServerPluginUsageReporting({
		sendVariableValues: { all: true },
		sendHeaders: {
			onlyNames: ["x-forwarded-for", "CF-Connecting-IP", "referer", "User-agent", "host", "origin"],
		},
		generateClientInfo: ({ request }) => {
			const headers = request.http && request.http.headers
			return {
				clientName: headers?.get("apollographql-client-name") || "Unknown Client",
				clientVersion: headers?.get("apollographql-client-version") || "Unversioned",
			}
		},
		endpointUrl: env.NODE_ENV === "production" ? undefined : "http://localhost:3000",
	}),
]

const getExtensions = (response: any): any => {
	if (
		typeof response !== "object" ||
		response === null ||
		response instanceof Boolean ||
		response instanceof Date ||
		response instanceof Number ||
		response instanceof RegExp ||
		response instanceof String
	)
		return response
	if (Array.isArray(response)) {
		return response
	}

	for (const key in response) {
		if (key === "extensions" && response[key].message) {
			const date = new Date(Date.now() + 1000 * 60 * 60 * 9).toISOString()
			delete response[key]?.code
			return {
				extensions: {
					...response[key],
					status: !(response instanceof ApolloError),
					date,
				},
			}
		}
		const obj = getExtensions(response[key]) as any
		if (obj?.extensions) return obj
	}
	return response
}

export const ApolloLogPlugin = (): ApolloServerPlugin => {
	return {
		async requestDidStart() {
			const handlers: GraphQLRequestListener = {
				async executionDidStart() {
					return {
						willResolveField(fieldResolve) {
							return async (err, result) => {
								const obj = getExtensions(result)
								if (obj?.extensions && obj.extensions.message) {
									const db = (await mongoDB.get()) as Db
									await db.collection("history").insertOne({
										...obj.extensions,
										ip: fieldResolve.context.ip,
										role: fieldResolve.context.user?.role || "unknown",
									})
								}
								return result
							}
						},
					}
				},
			}
			return handlers
		},
	}
}
