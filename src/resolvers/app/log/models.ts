import { ClubType } from "config"

export type MongoQuery = [
	{
		$match: {
			role?: ClubType
			message?: RegExp
		}
	},
	{ $sort: { _id: -1 } },
	{ $skip: number },
	{ $limit: number }
]

export interface QueryOptions {
	role?: ClubType
	message?: RegExp
}
