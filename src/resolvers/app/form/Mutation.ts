import { RequiredContext } from "config"
import { MutationUpsertFormArgs } from "config/models"

export const upsertForm = async (parent: void, args: MutationUpsertFormArgs, context: RequiredContext) => {
	const { ...data } = args.input
	const role = context.user.role
	const latestUpdatedAt = new Date(Date.now() + 1000 * 60 * 60 * 9).toISOString()
	const { value } = await context.db
		.collection("form")
		.findOneAndUpdate(
			{ club: role },
			{ $set: { club: role, ...data, latestUpdatedAt } },
			{ upsert: true, returnDocument: "after" }
		)
	return {
		...value,
		tracing: {
			message: `${context.user.role.toLowerCase()} 동아리의 폼을 수정`,
			role: context.user.role,
			args: JSON.stringify(args.input),
		},
	}
}
