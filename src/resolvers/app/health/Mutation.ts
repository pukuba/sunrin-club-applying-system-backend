import { HealthMutationInput } from "resolvers/app/health/models"

export const healthCheck = (parent: void, args: HealthMutationInput) => {
	return args.input.data === "ping" ? "pong" : null
}
