import dotenv from "dotenv"
dotenv.config()

import { env, mongoDB } from "config"
import { express as voyagerMiddleware } from "graphql-voyager/middleware"
import { ApolloServer } from "apollo-server-express"
import { createServer, Server } from "http"
import depthLimit from "graphql-depth-limit"
import { permissions } from "lib"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { GraphQLUpload } from "graphql-upload"
import { typeDefs as ScalarNameTypeDefinition, resolvers as scalarResolvers } from "graphql-scalars"
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
if (env.NODE_ENV !== "production") {
	app.use("/voyager", voyagerMiddleware({ endpointUrl: "/api" }))
	app.use("/graphql", expressPlayground({ endpoint: "/api" }))
}

const schema = constraintDirective()(
	makeExecutableSchema({
		typeDefs: [...typeDefs, ...ScalarNameTypeDefinition, constraintDirectiveTypeDefs],
		resolvers: {
			...resolvers,
			...scalarResolvers,
			Upload: GraphQLUpload,
		},
	})
)

export default (async () => {
	const db = await mongoDB.get()
	const server = new ApolloServer({
		schema: applyMiddleware(schema, permissions),
		context: () => {
			return { db }
		},
		validationRules: [depthLimit(8)],
		debug: env.NODE_ENV !== "production",
		introspection: env.NODE_ENV !== "production",
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
