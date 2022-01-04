import { ObjectID } from "config"
import { Club } from "config/models"

export type MongoQuery = [
	{
		$match: {
			club?: Club
			_id?: { $gt: ObjectID }
			studentId?: string
		}
	},
	{ $sort: { _id: -1 } },
	{ $limit: number }
]

export interface QueryOptions {
	club?: Club
}
