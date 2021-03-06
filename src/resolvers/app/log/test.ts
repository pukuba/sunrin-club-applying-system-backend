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
			{ id: "teamlog77", password: "test", role: "TEAMLOG" },
			{ id: "teacher11", password: "test", role: "TEACHER" },
			{ id: "emotion01", password: "test", role: "EMOTION" },
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
                        message
                        logId
                        status
                        ip
                        role
						date
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
					.set("Authorization", `Bearer ${jwt.sign({ id: "emotion01", role: "EMOTION" }, env.JWT_SECRET)}`)
					.send(JSON.stringify({ query, variables }))
					.expect(200)
				const data = body.data.getLogByKeyword as LogConnection
				deepEqual(data.__typename, "LogConnection")
				deepEqual(data.totalCount, 7)
				deepEqual(data.edges[3], {
					message: "emotion ????????? ????????? ?????? ?????? (?????? : 10217 / ?????? : ?????????) - ????????? ??????",
					status: false,
					role: "EMOTION",
					ip: "::ffff:127.0.0.1",
					date: data.edges[3].date,
					logId: data.edges[3].logId,
				})
				deepEqual(data.edges[6], {
					message: "emotion ????????? ????????? ?????? ?????? (?????? : 10217 / ?????? : ?????????)",
					date: data.edges[6].date,
					logId: data.edges[6].logId,
					status: true,
					role: "EMOTION",
					ip: "::ffff:127.0.0.1",
				})
				deepEqual(data.pageInfo, {
					nowPage: 1,
					maxPage: 1,
				})
			})

			it("Successful request (teacher account) / Should be return LogConnection", async () => {
				const variables = {
					limit: 10,
					page: 1,
					keyword: "10217",
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${jwt.sign({ id: "teacher11", role: "TEACHER" }, env.JWT_SECRET)}`)
					.send(JSON.stringify({ query, variables }))
					.expect(200)
				const data = body.data.getLogByKeyword as LogConnection
				deepEqual(data.__typename, "LogConnection")
				deepEqual(data.totalCount, 5)
				deepEqual(data.edges[0], {
					message: "emotion ????????? ????????? ?????? ?????? (?????? : 10217 / ?????? : ?????????) - ????????? ??????",
					status: false,
					ip: "::ffff:127.0.0.1",
					role: "EMOTION",
					logId: data.edges[0].logId,
					date: data.edges[0].date,
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
