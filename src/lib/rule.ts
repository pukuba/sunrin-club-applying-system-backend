import { Context } from "config"
import { rule } from "graphql-shield"

export const isValidGetFormByClub = rule()(async (parent: void, args: { club: string }, context: Context) => {
	const id = context.user?.id
	const role = context.user?.role
	if (role === "teacher" || role === args.club) {
		const ret = (await context.db.collection("user").findOne({ id: id })) !== null
		return ret
	}
	return "권한이 없습니다"
})

export const isValidUser = rule()(async (parent: void, args: void, context: Context) => {
	const id = context.user?.id
	const role = context.user?.role
	if (role) {
		return (await context.db.collection("user").findOne({ id: id })) !== null
	}
	return "권한이 없습니다"
})
