import { deepStrictEqual as deepEqual } from "assert"
import request from "supertest"
import appPromise from "app"
import { env } from "config/env"
import { Server } from "http"
import { mongoDB } from "config"
import { LogConnection } from "config/models"
import { Db } from "mongodb"
import jwt from "jsonwebtoken"

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

	describe("Query getLogByKeyword", () => {
		const query = `
            query getLogByKeyword($keyword: String, $limit: UnsignedInt, $page: UnsignedInt!) {
                getLogByKeyword(keyword: $keyword, limit: $limit, page: $page) {
                    totalCount
                    __typename
                    edges {
                        action
                        message
                        logId
                        status
                        ip
						club
                        role
                    }
                    pageInfo {
                        nowPage
                        maxPage
                    }
                }
            }
        `
		describe("Success", () => {
			it("Successful request (emotion account) / Should be return LogConnection", async () => {
				const variables = {
					limit: 10,
					page: 1,
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${jwt.sign({ id: "emotion01", role: "emotion" }, env.JWT_SECRET)}`)
					.send(JSON.stringify({ query, variables }))
					.expect(200)
				const data = body.data.getLogByKeyword as LogConnection
				deepEqual(data.__typename, "LogConnection")
				deepEqual(data.totalCount, 3)
				deepEqual(data.edges[0], {
					action: "지원서 제출",
					message: "요청 횟수 초과 (학번 : 10217)",
					status: false,
					ip: "::ffff:127.0.0.1",
					role: "unknown",
					logId: data.edges[0].logId,
					club: "emotion",
				})
				deepEqual(data.edges[2], {
					action: "동아리 지원서 제출",
					message: "emotion 동아리 지원서 제출 (학번 : 10217)",
					logId: data.edges[2].logId,
					status: true,
					ip: "::ffff:127.0.0.1",
					role: "unknown",
					club: "emotion",
				})
			})

			it("Successful request (teamlog account) / Should be return LogConnection", async () => {
				const variables = {
					limit: 10,
					page: 1,
					message: "10217",
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${jwt.sign({ id: "teacher11", role: "teacher" }, env.JWT_SECRET)}`)
					.send(JSON.stringify({ query, variables }))
					.expect(200)
				const data = body.data.getLogByKeyword as LogConnection
				deepEqual(data.__typename, "LogConnection")
				deepEqual(data.totalCount, 4)
				deepEqual(data.edges[0], {
					action: "지원서 제출",
					message: "요청 횟수 초과 (학번 : 10217)",
					status: false,
					ip: "::ffff:127.0.0.1",
					role: "unknown",
					logId: data.edges[0].logId,
					club: "emotion",
				})
			})
		})
	})

	after(async () => {
		const db = (await mongoDB.get()) as Db
		await db.collection("user").deleteMany({ id: { $in: deletedIds } })
		await db.collection("log").deleteMany({})
	})
})
