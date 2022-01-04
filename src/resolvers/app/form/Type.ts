import { Form as FormType } from "config/models"
import { ObjectID } from "mongodb"

export const Form = {
	introduce: (parent: FormType) => parent.introduce || "",
	question: (parent: FormType) => (Array.isArray(parent.question) ? parent.question : []),
	formId: (parent: FormType & { _id: ObjectID }) => parent._id,
}
