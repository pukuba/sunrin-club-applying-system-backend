import { shield } from "graphql-shield"
import { isValidUser, isValidGetFormByClub } from "./rule"

export const permissions = shield(
	{
		Mutation: {
			sendMessage: isValidUser,
		},
		Query: {
			getFormByClub: isValidGetFormByClub,
			getFormByStudentId: isValidUser,
			getStudentByClub: isValidGetFormByClub,
			getLogByKeyword: isValidUser,
		},
	},
	{ allowExternalErrors: true }
)
