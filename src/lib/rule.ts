import { Context } from "config"
import { rule } from "graphql-shield"

export const isArgsClubEqualRole = rule()(async (parent: void, args: { club: string }, context: Context) => {
	const id = context.user?.id
	const role = context.user?.role
	let ret = false
	if (role === "TEACHER" || role === args.club) {
		ret = (await context.db.collection("user").findOne({ id: id })) !== null
	}
	return ret || "권한이 없습니다"
})

export const isValidUser = rule()(async (parent: void, args: void, context: Context) => {
	const id = context.user?.id
	const role = context.user?.role
	let ret = false
	if (role) {
		ret = (await context.db.collection("user").findOne({ id: id })) !== null
	}
	return ret || "권한이 없습니다"
})
