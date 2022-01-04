import { Type as answer } from "resolvers/app/answer"
import { Type as log } from "resolvers/app/log"
import { Type as form } from "resolvers/app/form"

export default {
	...answer,
	...log,
	...form,
}
