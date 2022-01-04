import { Context, ObjectID, RequiredContext } from "config"
import { MongoQuery } from "./models"
import { QueryGetAnswerByClubArgs, QueryGetAnswerByStudentIdArgs } from "config/models"

export const getAnswerByClub = async (parent: void, args: QueryGetAnswerByClubArgs, context: Context) => {
	const { limit, cursor, club } = args
	const { db } = context
	const query: MongoQuery = [
		{
			$match: {
				club,
			},
		},
		{ $sort: { _id: -1 } },
		{ $limit: limit },
	]

	if (cursor) {
		query[0].$match["_id"] = { $gt: new ObjectID(cursor) }
	}
	const [data, count] = await Promise.all([
		db.collection("answer").aggregate(query).toArray(),
		db.collection("answer").find({ club }).count(),
	])
	return {
		totalCount: count,
		edges: data.map(x => ({ node: x, cursor: x._id.toString() })),
		pageInfo: {
			hasNextPage: data.length === limit,
			startCursor: cursor,
			endCursor: data[data.length - 1]?._id.toString() ?? null,
		},
	}
}

export const getAnswerByStudentId = async (
	parent: void,
	args: QueryGetAnswerByStudentIdArgs,
	context: RequiredContext
) => {
	const { limit, cursor, studentId } = args
	const club = context.user.role
	let options = {}
	if (club !== "TEACHER") {
		options = { club }
	}
	const query: MongoQuery = [
		{
			$match: {
				studentId,
				...options,
			},
		},
		{ $sort: { _id: -1 } },
		{ $limit: limit },
	]
	if (cursor) {
		query[0].$match["_id"] = { $gt: new ObjectID(cursor) }
	}
	const [data, count] = await Promise.all([
		context.db.collection("answer").aggregate(query).toArray(),
		context.db.collection("answer").find({ studentId }).count(),
	])
	return {
		totalCount: count,
		edges: data.map(x => ({ node: x, cursor: x._id.toString() })),
		pageInfo: {
			hasNextPage: data.length === limit,
			startCursor: cursor,
			endCursor: data[data.length - 1]?._id.toString() ?? null,
		},
	}
}

export const getLiveAnswerStatus = async (parent: void, args: void, context: Context) => {
	const data = await context.db
		.collection("answer")
		.aggregate([
			{ $group: { _id: "$club", studentId: { $addToSet: "$studentId" } } },
			{
				$project: {
					club: 1,
					answerCount: {
						$cond: { if: { $isArray: "$studentId" }, then: { $size: "$studentId" }, else: "NA" },
					},
				},
			},
			{ $sort: { answerCount: -1 } },
		])
		.toArray()
	return data.map(x => {
		return { club: x._id, answerCount: x.answerCount }
	})
}
