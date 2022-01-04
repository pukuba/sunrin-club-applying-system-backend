import { deepStrictEqual as deepEqual } from "assert"
import request from "supertest"
import appPromise from "app"
import { Server } from "http"
import { mongoDB, redis } from "config"
import { env } from "config/env"
import { Db } from "mongodb"
import jwt from "jsonwebtoken"
import { SendMessageInvalidInputError, RateLimitError } from "config/models"

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
		const obj = [{ id: "teacher11", password: "test", role: "TEACHER" }]
		await db.collection("user").insertMany(obj)
		obj.forEach(x => deletedUserIds.push(x.id))
		token = {
			teacher: jwt.sign({ role: "TEACHER", id: "teacher11" }, env.JWT_SECRET),
			invalid: jwt.sign({ role: "TEACHER", id: "01010100" }, env.JWT_SECRET),
		}
	})

	describe("Mutation sendMessage", () => {
		const query = `
            mutation ($input: SendMessageInput!) {
                sendMessage (input: $input) {
					... on SendMessagePayload {
						message
						status
					}
					... on Error {
						message
						path
						suggestion
					}
					... on RateLimitError {
						afterTry
					}
					__typename
				}
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

				deepEqual(body.data.sendMessage, {
					message: "메세지 전송 성공",
					status: true,
					__typename: "SendMessagePayload",
				})
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
				deepEqual(body.errors[0].message, "권한이 없습니다")
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
				deepEqual(body.errors[0].message, "권한이 없습니다")
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
				deepEqual(body.errors[0].message, "권한이 없습니다")
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
				const data = body.data.sendMessage as SendMessageInvalidInputError
				deepEqual(data, {
					__typename: "SendMessageInvalidInputError",
					message: "전송 메세지 개수 초과",
					path: "sendMessage",
					suggestion: "한번에 전송하는 메세지를 80개 이하로 해야합니다",
				})
			})

			it("Failed request (too many requests) / Should be return errors", async () => {
				await redis.setex("sendMessage:teacher", 10, "3")
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
				const data = body.data.sendMessage as RateLimitError
				deepEqual(data, {
					__typename: "RateLimitError",
					message: "너무 자주 요청했습니다",
					path: "sendMessage",
					suggestion: "잠시 후에 시도해주세요",
					afterTry: data.afterTry,
				})
			})
		})
	})

	after(async () => {
		const db = (await mongoDB.get()) as Db
		await db.collection("user").deleteMany({ id: { $in: deletedUserIds } })
		await db.collection("log").deleteMany({})
	})
})
