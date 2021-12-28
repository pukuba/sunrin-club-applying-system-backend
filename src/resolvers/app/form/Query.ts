import { Context, ObjectID } from "config"
import { GetFormByClubQuery } from "./models"
import { QueryGetFormByClubArgs } from "config/models"

export const getFormByClub = async (parent: void, args: QueryGetFormByClubArgs, context: Context) => {
	const { offset, cursor, club } = args
	const { db } = context
	const query: GetFormByClubQuery = [
		{
			$match: {
				club,
			},
		},
		{ $sort: { _id: -1 } },
		{ $limit: offset as number },
	]

	if (cursor) {
		query[0].$match["_id"] = { $gt: new ObjectID(cursor) }
	}
	const [data, count] = await Promise.all([
		db.collection("form").aggregate(query).toArray(),
		db.collection("form").find({ club }).count(),
	])
	return {
		totalCount: count,
		edges: data.map(x => ({ node: x, cursor: x._id.toString() })),
		pageInfo: {
			hasNextPage: data.length === offset,
			startCursor: cursor,
			endCursor: data[data.length - 1]?._id.toString() ?? null,
		},
	}
}
