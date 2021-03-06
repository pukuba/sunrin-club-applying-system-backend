import dotenv from "dotenv"
dotenv.config()

import { env } from "config/env"
import { mongoDB, redis, logOptions, ApolloLogPlugin } from "config"
import { express as voyagerMiddleware } from "graphql-voyager/middleware"
import { ApolloServer } from "apollo-server-express"
import { createServer, Server } from "http"
import depthLimit from "graphql-depth-limit"
import { permissions, decodeToken, ratelimitDirectiveTransformer } from "lib"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { GraphQLUpload } from "graphql-upload"
import { typeDefs as ScalarNameTypeDefinition, resolvers as scalarResolvers } from "graphql-scalars"
import * as customScalar from "config/scalars"
import { constraintDirective, constraintDirectiveTypeDefs } from "graphql-constraint-directive"
import { applyMiddleware } from "graphql-middleware"

import { loadFilesSync } from "@graphql-tools/load-files"
const typeDefs = loadFilesSync("src/**/*.graphql")

import express from "express"
import expressPlayground from "graphql-playground-middleware-express"
import { bodyParserGraphQL } from "body-parser-graphql"

import resolvers from "resolvers"
const app = express()
app.use(bodyParserGraphQL())

app.use("/voyager", voyagerMiddleware({ endpointUrl: "/api" }))
app.use("/graphql", expressPlayground({ endpoint: "/api" }))

let schema = constraintDirective()(
	makeExecutableSchema({
		typeDefs: [...typeDefs, ...ScalarNameTypeDefinition, constraintDirectiveTypeDefs],
		resolvers: {
			...resolvers,
			...customScalar,
			...scalarResolvers,
			Upload: GraphQLUpload,
		},
	})
)

schema = applyMiddleware(ratelimitDirectiveTransformer(schema, "ratelimit"), permissions)
export default (async () => {
	const db = await mongoDB.get()
	const server = new ApolloServer({
		schema,
		context: ({ req }) => {
			const ip = req.headers["x-forwarded-for"] || req.headers["cf-connecting-ip"] || req.socket.remoteAddress
			const token = req.headers["authorization"]
			return { db, redis, ip, user: decodeToken(token) }
		},
		validationRules: [depthLimit(8)],
		debug: env.NODE_ENV !== "production",
		introspection: env.NODE_ENV !== "production",
		plugins: [...logOptions, ApolloLogPlugin],
	})

	await server.start()

	server.applyMiddleware({
		app,
		path: "/api",
	})

	const httpServer = createServer(app)
	httpServer.timeout = 5000
	return httpServer as Server
})()
