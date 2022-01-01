import { shield, and } from "graphql-shield"
import { isValidForm, canSubmit, canSMS, isValidUser, isValidGetFormByClub } from "./rule"

export const permissions = shield(
	{
		Mutation: {
			createForm: and(isValidForm, canSubmit),
			sendMessage: and(isValidUser, canSMS),
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
