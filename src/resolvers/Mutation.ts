import { Mutation as health } from "resolvers/app/health"
import { Mutation as form } from "resolvers/app/form"
import { Mutation as user } from "resolvers/app/user"

export default {
	...health,
	...form,
	...user,
}
