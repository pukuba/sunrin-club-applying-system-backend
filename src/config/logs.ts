import { ApolloServerPluginUsageReporting } from "apollo-server-core"
import { env } from "config/env"

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
