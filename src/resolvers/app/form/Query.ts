import { Context } from "config/types"
import { QueryGetFormByClubArgs } from "config/models"

export const getFormByClub = async (parent: void, args: QueryGetFormByClubArgs, context: Context) => {
	const document = await context.db.collection("form").findOne({ club: args.club })
	if (document) {
		return {
			__typename: "InvalidFormError",
			message: `${args.club.toLowerCase()} 동아리의 지원 양식이 아직 존재하지 않습니다`,
			suggestion: `${args.club.toLowerCase()} 동아리에 문의해주세요`,
			path: "getFormByClub",
		}
	}
	return {
		__typename: "Form",
		...document,
	}
}
