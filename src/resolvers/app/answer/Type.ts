import { Answer as AnswerType } from "config/models"
import { ObjectID } from "mongodb"

export const Answer = {
	answerId: (parent: AnswerType & { _id: ObjectID }) => {
		return parent._id
	},
}
