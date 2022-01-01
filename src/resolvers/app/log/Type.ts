import { Log as LogInterface } from "config/models"
import { ObjectID } from "mongodb"

export const Log = {
	logId: (parent: LogInterface & { _id: ObjectID }) => {
		return parent._id
	},
}
