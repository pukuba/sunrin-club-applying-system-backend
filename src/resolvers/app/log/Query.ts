import { RequiredContext } from "config"
import { QueryGetLogByKeywordArgs } from "config/models"
import { MongoQuery, QueryOptions } from "./models"

export const getLogByKeyword = async (parent: void, args: QueryGetLogByKeywordArgs, context: RequiredContext) => {
	const { keyword, limit, page } = args
	let options: QueryOptions = {}
	const club = context.user.role
	if (club !== "teacher") {
		options["club"] = club
	}
	if (keyword) {
		options["message"] = new RegExp(keyword)
	}
	const query: MongoQuery = [
		{ $match: options },
		{ $sort: { _id: -1 } },
		{ $skip: (page - 1) * limit },
		{ $limit: limit as number },
	]
	const [data, count] = await Promise.all([
		context.db.collection("log").aggregate(query).toArray(),
		context.db.collection("log").find(options).count(),
	])
	return {
		totalCount: count,
		edges: data,
		pageInfo: {
			nowPage: args.page,
			totalPage: Math.max(Math.ceil(count / limit), 1),
		},
	}
}