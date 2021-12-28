export interface CreateFormInput {
	input: {
		studentID: number
		club: "nefus" | "layer7" | "unifox" | "teamlog" | "emotion"
		name: string
		answerList: string[]
		portfolioURL: URL
		otherURLs: URL[]
	}
}

import { PaginationInput, ObjectID } from "config"

export interface GetFormByClubInput extends PaginationInput {
	club: "nefus" | "layer7" | "unifox" | "teamlog" | "emotion"
}

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
