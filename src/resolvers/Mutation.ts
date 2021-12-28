import { Mutation as health } from "resolvers/app/health"
import { Mutation as apply } from "resolvers/app/apply"

export default {
	...health,
	...apply,
}
