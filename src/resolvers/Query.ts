import { Query as health } from "resolvers/app/health"
import { Query as form } from "resolvers/app/form"

export default {
	...health,
	...form,
}
