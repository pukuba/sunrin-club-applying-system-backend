import { ObjectID } from "config"

export type MongoQuery = [
	{
		$match: {
			club?: "nefus" | "layer7" | "unifox" | "teamlog" | "emotion"
			_id?: { $gt: ObjectID }
			studentId?: string
		}
	},
	{ $sort: { _id: -1 } },
	{ $limit: number }
]

export interface QueryOptions {
	club?: "nefus" | "layer7" | "unifox" | "teamlog" | "emotion"
}
