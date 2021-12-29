import { deepStrictEqual as deepEqual } from "assert"
import request from "supertest"
import { User } from "config/models"
import appPromise from "app"
import { Server } from "http"
import { mongoDB, redis } from "config"
import { Db, ObjectID } from "mongodb"

describe("Auth Service", () => {
	let app: Server
	const deletedIds: string[] = []
	before(async () => {
		app = await appPromise
		const db = (await mongoDB.get()) as Db
		const obj = [
			{ id: "teamlog77", password: "test", role: "teamlog" },
			{ id: "teacher11", password: "test", role: "teacher" },
			{ id: "emotion01", password: "test", role: "emotion" },
		]
		await db.collection("user").insertMany(obj)
		obj.forEach(x => deletedIds.push(x.id))
	})

	describe("Mutation login", () => {
		const query = `
				mutation ($input: LoginInput!) {
					login(input: $input) {
						role
                        token
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
				deepEqual(role, "teamlog")
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
				deepEqual(role, "teacher")
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
				deepEqual(body.errors[0].message, "아이디 혹은 비밀번호가 잘못되었습니다")
			})
		})
	})

	describe("Mutation sendVerifyCode", () => {
		const query = `
				mutation ($input: SendVerifyCodeInput!) {
					sendVerifyCode(input: $input) 
				}
			`
		describe("Success", () => {
			it("Successful request (01000000000) / Should be return true", async () => {
				const input = {
					phoneNumber: "01000000000",
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				deepEqual(body.data.sendVerifyCode, true)
			})
		})
	})

	describe("Mutation checkVerifyCode", () => {
		const query = `
				mutation ($input: CheckVerifyCodeInput!) {
					checkVerifyCode(input: $input)
				}
		`
		describe("Success", () => {
			it("Successful request (valid verification code) / Should be return true", async () => {
				const input = {
					phoneNumber: "01000000000",
					verifyCode: await redis.get("verifyCode:01000000000"),
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				deepEqual(typeof body.data.checkVerifyCode, "string")
			})
		})

		describe("Failure", () => {
			before(async () => {
				await redis.setex("verifyCode:01000000000", 300, "123456")
			})
			after(async () => {
				await redis.del("verifyCode:01000000000")
			})
			it("Failed request (invalid phoneNumber code) / Should be return errors", async () => {
				const input = {
					phoneNumber: "01000000001",
					verifyCode: "123456",
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				deepEqual(body.errors[0].message, "인증번호가 유효하지 않습니다")
			})

			it("Failed request (invalid verification code) / Should be return true", async () => {
				const input = {
					phoneNumber: "01000000000",
					verifyCode: "000000",
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				deepEqual(body.errors[0].message, "인증번호가 유효하지 않습니다")
			})
		})
	})

	after(async () => {
		const db = (await mongoDB.get()) as Db
		await db.collection("user").deleteMany({ id: { $in: deletedIds } })
	})
})
