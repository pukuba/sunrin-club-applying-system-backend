import { Form as FormType } from "config/models"

export const Form = {
	introduce: (parent: FormType) => parent.introduce || "",
	question: (parent: FormType) => (Array.isArray(parent.question) ? parent.question : []),
}
