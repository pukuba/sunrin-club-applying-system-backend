import { ObjectID, ClubType } from "config"

export type MongoQuery = [
	{
		$match: {
			club?: ClubType
			_id?: { $gt: ObjectID }
			studentId?: string
		}
	},
	{ $sort: { _id: -1 } },
	{ $limit: number }
]

export interface QueryOptions {
	club?: ClubType
}
