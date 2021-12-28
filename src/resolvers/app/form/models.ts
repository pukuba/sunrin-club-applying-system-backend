import { ObjectID } from "config"

export type GetFormByClubQuery = [
	{
		$match: {
			club: "nefus" | "layer7" | "unifox" | "teamlog" | "emotion"
			_id?: { $gt: ObjectID }
		}
	},
	{ $sort: { _id: -1 } },
	{ $limit: number }
]
