import app from "app"
import { env } from "config/env"
;(async () => {
	const server = await app
	server.listen(env.PORT, () => {
		console.log(`server running http://localhost:${env.PORT}/graphql`)
	})
})()
