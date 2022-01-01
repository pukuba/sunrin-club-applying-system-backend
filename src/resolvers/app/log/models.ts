import { ClubType } from "config"

export type MongoQuery = [
	{
		$match: {
			club?: ClubType
			message?: RegExp
		}
	},
	{ $sort: { _id: -1 } },
	{ $skip: number },
	{ $limit: number }
]

export interface QueryOptions {
	club?: ClubType
	message?: RegExp
}
