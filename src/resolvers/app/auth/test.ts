import { deepStrictEqual as deepEqual } from "assert"
import request from "supertest"
import { User, InvalidAccountError } from "config/models"
import appPromise from "app"
import { Server } from "http"
import { mongoDB } from "config"
import { Db } from "mongodb"

describe("Auth Service", () => {
	let app: Server
	const deletedIds: string[] = []
	before(async () => {
		app = await appPromise
		const db = (await mongoDB.get()) as Db
		const obj = [
			{ id: "teamlog77", password: "test", role: "TEAMLOG" },
			{ id: "teacher11", password: "test", role: "TEACHER" },
			{ id: "emotion01", password: "test", role: "EMOTION" },
		]
		await db.collection("user").insertMany(obj)
		obj.forEach(x => deletedIds.push(x.id))
	})

	describe("Mutation login", () => {
		const query = `
				mutation ($input: LoginInput!) {
					login(input: $input) {
						... on User {
							role
							token
						}
						... on InvalidAccountError {
							message
							path
							suggestion
						}
						__typename
					}
				}
			`
		describe("Success", () => {
			it("Successful request (teamlog77 auccount) / Should be return User", async () => {
				const input = {
					id: "teamlog77",
					password: "test",
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				const { role } = body.data.login as User
				deepEqual(role, "TEAMLOG")
			})

			it("Successful request (teacher11 auccount) / Should be return User", async () => {
				const input = {
					id: "teacher11",
					password: "test",
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				const { role } = body.data.login as User
				deepEqual(role, "TEACHER")
			})
		})

		describe("Failure", () => {
			it("Failed request (id is not exist) / Should be return errors", async () => {
				const input = {
					id: "teamlog7711",
					password: "test",
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				const data = body.data.login as InvalidAccountError
				deepEqual(data, {
					__typename: "InvalidAccountError",
					message: "????????? ?????? ??????????????? ?????????????????????",
					path: "login",
					suggestion: "????????? ?????? ??????????????????",
				})
			})
		})
	})

	after(async () => {
		const db = (await mongoDB.get()) as Db
		await db.collection("user").deleteMany({ id: { $in: deletedIds } })
	})
})
