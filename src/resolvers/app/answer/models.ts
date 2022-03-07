import { ObjectID } from "config"
import { Club } from "config/models"

export type MongoQuery = [
	{ $sort: { _id: -1 } },
	{
		$match: {
			club?: Club
			_id?: { $lt: ObjectID }
			studentId?: string
		}
	},
	{ $limit: number }
]

export interface QueryOptions {
	club?: Club
}
