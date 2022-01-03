import { deepStrictEqual as deepEqual } from "assert"
import request from "supertest"
import appPromise from "app"
import { Server } from "http"

describe("Server running test", () => {
	let app: Server
	before(async () => {
		app = await appPromise
	})

	describe("Apollo-Server-Express Core", () => {
		it("should return http status code 200", async () => {
			await request(app).get("/.well-known/apollo/server-health").expect(200, { status: "pass" })
		})
	})

	describe("Query healthLive", () => {
		it("Should be return http status code 200", async () => {
			const query = "{healthLive}"
			await request(app).get(`/api?query=${query}`).expect(200)
		})
		it("Should be return http status code 400", async () => {
			const query = "query{healthLive1}"
			const { body } = await request(app).get(`/api?query=${query}`).expect(400)
			deepEqual(
				body.errors[0].message,
				'Cannot query field "healthLive1" on type "Query". Did you mean "healthLive"?'
			)
		})
	})

	describe("Mutation testMutation", () => {
		it("Should be return http status code 200", async () => {
			const query = 'mutation{healthCheck(input:{data:"ping"})}'
			await request(app)
				.post("/api")
				.set("Content-Type", "application/json")
				.send(JSON.stringify({ query }))
				.expect(200, { data: { healthCheck: "pong" } })
		})
		it("Should be return http status code 400", async () => {
			const query = 'mutation{healthCheck(input:{data:"pong"})}'
			const { body } = await request(app)
				.post("/api")
				.set("Content-Type", "application/json")
				.send(JSON.stringify({ query }))
				.expect(400)
			deepEqual(
				body.errors[0].message,
				'Expected value of type "data_String_NotNull_pattern_ping!", found "pong"; Must match ^ping$'
			)
		})
	})
})
