import { Query as health } from "resolvers/app/health"
import { Query as answer } from "resolvers/app/answer"
import { Query as log } from "resolvers/app/log"

export default {
	...health,
	...answer,
	...log,
}
