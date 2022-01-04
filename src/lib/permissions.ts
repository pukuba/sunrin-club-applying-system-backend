import { shield } from "graphql-shield"
import { isValidUser, isArgsClubEqualRole } from "./rule"

export const permissions = shield(
	{
		Mutation: {
			sendMessage: isValidUser,
			upsertForm: isValidUser,
		},
		Query: {
			getAnswerByClub: isArgsClubEqualRole,
			getAnswerByStudentId: isValidUser,
			getLogByKeyword: isValidUser,
		},
	},
	{ allowExternalErrors: true }
)
