import { ApolloServerPluginUsageReporting } from "apollo-server-core"
import { env } from "config/env"
import { Db } from "mongodb"
import { mongoDB } from "./connectDB"
import { ApolloServerPlugin, GraphQLRequestListener } from "apollo-server-plugin-base"

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

const getLogData = (response: any): any => {
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
		if (key === "tracing" && response[key].message) {
			const date = new Date(Date.now() + 1000 * 60 * 60 * 9).toISOString()
			return {
				tracing: {
					...response[key],
					status: response["path"] && response["suggestion"] ? false : true,
					date,
				},
			}
		}
		const obj = getLogData(response[key]) as any
		if (obj?.tracing) return obj
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
								const obj = getLogData(result)
								if (obj?.tracing && obj.tracing.message) {
									const data = {
										...obj.tracing,
										ip: fieldResolve.context.ip,
									}
									if (!data["role"]) {
										data["role"] = fieldResolve.context.user?.role || "unknown"
									}
									const db = (await mongoDB.get()) as Db
									await db.collection("log").insertOne(data)
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
