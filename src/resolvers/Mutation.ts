import { Mutation as health } from "resolvers/app/health"
import { Mutation as apply } from "resolvers/app/apply"
import { Mutation as user } from "resolvers/app/user"

export default {
	...health,
	...apply,
	...user,
}
