import { ClubType } from "config"

export type MongoQuery = [
	{ $sort: { _id: -1 } },
	{
		$match: {
			role?: ClubType
			message?: RegExp
		}
	},
	{ $skip: number },
	{ $limit: number }
]

export interface QueryOptions {
	role?: ClubType
	message?: RegExp
}
