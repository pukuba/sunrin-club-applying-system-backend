import { Mutation as health } from "resolvers/app/health"
import { Mutation as answer } from "resolvers/app/answer"
import { Mutation as auth } from "resolvers/app/auth"
import { Mutation as util } from "resolvers/app/util"
import { Mutation as form } from "resolvers/app/form"

export default {
	...health,
	...answer,
	...auth,
	...util,
	...form,
}
