import { shield } from "graphql-shield"

export const permissions = shield(
	{
		Mutation: {},
		Query: {},
	},
	{ allowExternalErrors: true }
)
