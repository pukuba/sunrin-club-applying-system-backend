import { Mutation as health } from "resolvers/app/health"
import { Mutation as form } from "resolvers/app/form"
import { Mutation as auth } from "resolvers/app/auth"
import { Mutation as util } from "resolvers/app/util"

export default {
	...health,
	...form,
	...auth,
	...util,
}
