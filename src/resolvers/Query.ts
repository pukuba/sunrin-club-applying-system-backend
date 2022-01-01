import { Query as health } from "resolvers/app/health"
import { Query as form } from "resolvers/app/form"
import { Query as log } from "resolvers/app/log"

export default {
	...health,
	...form,
	...log,
}
