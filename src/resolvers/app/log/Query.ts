import { RequiredContext } from "config"
import { QueryGetLogByKeywordArgs, RequireFields } from "config/models"
import { MongoQuery, QueryOptions } from "./models"

export const getLogByKeyword = async (
	parent: void,
	args: RequireFields<QueryGetLogByKeywordArgs, "keyword">,
	context: RequiredContext
) => {
	const { keyword, limit, page } = args
	const options: QueryOptions = {}
	const role = context.user.role
	if (role !== "TEACHER") {
		options["role"] = role
	}
	if (keyword.length > 0) {
		options["message"] = new RegExp(keyword)
	}
	const query: MongoQuery = [
		{ $sort: { _id: -1 } },
		{ $match: options },
		{ $skip: (page - 1) * limit },
		{ $limit: limit },
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
			maxPage: Math.max(Math.ceil(count / limit), 1),
		},
	}
}
