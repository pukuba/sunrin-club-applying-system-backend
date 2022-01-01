import { Context, ObjectID, RequiredContext } from "config"
import { MongoQuery } from "./models"
import { QueryGetFormByClubArgs, QueryGetFormByStudentIdArgs, QueryGetStudentByClubArgs } from "config/models"

export const getFormByClub = async (parent: void, args: QueryGetFormByClubArgs, context: Context) => {
	const { limit, cursor, club } = args
	const { db } = context
	const query: MongoQuery = [
		{
			$match: {
				club,
			},
		},
		{ $sort: { _id: -1 } },
		{ $limit: limit as number },
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
			hasNextPage: data.length === limit,
			startCursor: cursor,
			endCursor: data[data.length - 1]?._id.toString() ?? null,
		},
	}
}

export const getFormByStudentId = async (parent: void, args: QueryGetFormByStudentIdArgs, context: RequiredContext) => {
	const { limit, cursor, studentId } = args
	const club = context.user.role
	let options = {}
	if (club !== "teacher") {
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
		{ $limit: limit as number },
	]
	if (cursor) {
		query[0].$match["_id"] = { $gt: new ObjectID(cursor) }
	}
	const [data, count] = await Promise.all([
		context.db.collection("form").aggregate(query).toArray(),
		context.db.collection("form").find({ studentId }).count(),
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

export const getStudentByClub = async (parent: void, args: QueryGetStudentByClubArgs, context: Context) => {
	const { club } = args
	let option = {}
	if (club) {
		option = { club: club }
	}
	const students = await context.db
		.collection("form")
		.aggregate([{ $match: option }, { $group: { _id: { studentId: "$studentId", name: "$name" } } }])
		.toArray()
	return students.map(x => {
		return {
			studentId: x._id.studentId,
			name: x._id.name,
		}
	})
}

export const getLiveFormStatus = async (parent: void, args: void, context: Context) => {
	const data = await context.db
		.collection("form")
		.aggregate([
			{ $group: { _id: "$club", studentId: { $addToSet: "$studentId" } } },
			{
				$project: {
					club: 1,
					formCount: { $cond: { if: { $isArray: "$studentId" }, then: { $size: "$studentId" }, else: "NA" } },
				},
			},
			{ $sort: { formCount: -1 } },
		])
		.toArray()
	return data.map(x => {
		return { club: x._id, formCount: x.formCount }
	})
}
