import { deepStrictEqual as deepEqual } from "assert"
import request from "supertest"
import appPromise from "app"
import { Server } from "http"
import { mongoDB, redis } from "config"
import { env } from "config/env"
import { Db } from "mongodb"
import jwt from "jsonwebtoken"

describe("Util Service", () => {
	let app: Server
	let token: {
		teacher: string
		invalid: string
	}
	const deletedUserIds: string[] = []
	before(async () => {
		app = await appPromise
		const db = (await mongoDB.get()) as Db
		const obj = [{ id: "teacher11", password: "test", role: "teacher" }]
		await db.collection("user").insertMany(obj)
		obj.forEach(x => deletedUserIds.push(x.id))
		token = {
			teacher: jwt.sign({ role: "teacher", id: "teacher11" }, env.JWT_SECRET),
			invalid: jwt.sign({ role: "teacher", id: "01010100" }, env.JWT_SECRET),
		}
	})

	describe("Mutation sendMessage", () => {
		const query = `
            mutation ($input: SendMessageInput!) {
                sendMessage(input: $input) 
            }
        `
		describe("Success", () => {
			it("Successful request (teacher11 auccount) / Should be return true", async () => {
				const input = {
					message: "sunrin test message",
					phoneNumberList: [env.MY_PHONE],
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${token.teacher}`)
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				deepEqual(body.data.sendMessage, true)
			})
		})

		describe("Failure", () => {
			it("Failed request (empty authorization header) / Should be return errors", async () => {
				const input = {
					message: "sunrin test message",
					phoneNumberList: [env.MY_PHONE],
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				deepEqual(body.errors[0].message, "Not Authorised!")
			})

			it("Failed request (invalid token) / Should be return errors", async () => {
				const input = {
					message: "sunrin test message",
					phoneNumberList: [env.MY_PHONE],
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${token.invalid}`)
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				deepEqual(body.errors[0].message, "Not Authorised!")
			})

			it("Failed request (invalid jwt) / Should be return errors", async () => {
				const input = {
					message: "sunrin test message",
					phoneNumberList: [env.MY_PHONE],
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", "Bearer sunrin")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				deepEqual(body.errors[0].message, "Not Authorised!")
			})

			it("Failed request (payload is too large) / Should be return errors", async () => {
				const input = {
					message: "sunrin hi",
					phoneNumberList: new Array(200).fill("01000000000"),
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${token.teacher}`)
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				deepEqual(body.errors[0].message, "전송할 수 있는 최대 개수는 80개 입니다")
			})

			it("Failed request (too many requests) / Should be return errors", async () => {
				await redis.setex("sms:teacher", 10, "3")
				const input = {
					message: "실패해야하는 메세지",
					phoneNumberList: [env.MY_PHONE],
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${token.teacher}`)
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				deepEqual(body.errors[0].message, "전송은 600초당 최대 3번 가능합니다")
			})
		})
	})

	after(async () => {
		const db = (await mongoDB.get()) as Db
		await db.collection("user").deleteMany({ id: { $in: deletedUserIds } })
	})
})
