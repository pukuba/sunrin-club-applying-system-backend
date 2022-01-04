import { shield } from "graphql-shield"
import { isValidUser, isValidGetAnswerByClub } from "./rule"

export const permissions = shield(
	{
		Mutation: {
			sendMessage: isValidUser,
		},
		Query: {
			getAnswerByClub: isValidGetAnswerByClub,
			getAnswerByStudentId: isValidUser,
			getLogByKeyword: isValidUser,
		},
	},
	{ allowExternalErrors: true }
)
