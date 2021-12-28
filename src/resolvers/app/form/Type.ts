import { Form as FormInterface } from "config/models"
import { ObjectID } from "mongodb"

export const Form = {
	formId: (parent: FormInterface & { _id: ObjectID }) => {
		return parent._id
	},
}
