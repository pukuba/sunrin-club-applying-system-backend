import { MutationHealthCheckArgs } from "config/models"

export const healthCheck = (parent: void, args: MutationHealthCheckArgs) => {
	return "pong"
}
