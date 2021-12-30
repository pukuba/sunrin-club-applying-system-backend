import { deepStrictEqual as deepEqual } from "assert"
import request from "supertest"
import { Form, FormConnection } from "config/models"
import appPromise from "app"
import { Server } from "http"
import { mongoDB, redis } from "config"
import { env } from "config/env"
import { Db, ObjectID } from "mongodb"
import jwt from "jsonwebtoken"

describe("Form Service", () => {
	let app: Server
	let token: {
		teacher: string
		emotion: string
		invalid: string
	}
	const formIds: string[] = []
	const deletedUserIds: string[] = []
	before(async () => {
		app = await appPromise
		const db = (await mongoDB.get()) as Db
		const obj = [
			{ id: "teacher11", password: "test", role: "teacher" },
			{ id: "emotion01", password: "test", role: "emotion" },
		]
		await db.collection("user").insertMany(obj)
		obj.forEach(x => deletedUserIds.push(x.id))
		token = {
			teacher: jwt.sign({ role: "teacher", id: "teacher11" }, env.JWT_SECRET),
			emotion: jwt.sign({ role: "emotion", id: "emotion01" }, env.JWT_SECRET),
			invalid: jwt.sign({ role: "teacher", id: "01010100" }, env.JWT_SECRET),
		}
	})

	describe("Mutation createForm", () => {
		const query = `
				mutation ($input: CreateFormInput!) {
					createForm(input: $input) {
						studentId
						name
						club
						answerList
						portfolioURL
						otherURLs
						phoneNumber
						formId
						date
					}
				}
			`
		describe("Success", () => {
			it("Successful request (first time) / Should be return Form type", async () => {
				const input = {
					studentId: 10217,
					name: "남승원",
					club: "emotion",
					answerList: ["자소서 문항1", "자소서 문항2", "자소서 문항3"],
					phoneNumber: "01000000000",
					portfolioURL: "https://www.naver.com/",
					otherURLs: ["https://www.google.com/", "https://www.daum.net/"],
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				const { formId, date, ...data } = body.data.createForm as Form
				formIds.push(formId)
				deepEqual(data, input)
				deepEqual(typeof date, "string")
			})

			it("Successful request (second time) / Should be return Form type", async () => {
				const input = {
					studentId: 10217,
					name: "남승원",
					club: "emotion",
					answerList: ["자소서 문항1", "자소서 문항2", "자소서 문항3 ㅇㅅㅇ!"],
					phoneNumber: "01000000000",
					portfolioURL: "https://github.com/pukuba/",
					otherURLs: ["https://www.google.com/", "https://www.daum.net/"],
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				const { formId, date, ...data } = body.data.createForm as Form
				formIds.push(formId)
				deepEqual(data, input)
				deepEqual(typeof date, "string")
			})
		})

		describe("Failure", () => {
			it("Failed request (payload is too large) / Should be return errors", async () => {
				const input = {
					studentId: 10217,
					name: "남승원",
					club: "emotion",
					answerList: ["", ""],
					phoneNumber: "01000000000",
					portfolioURL: "https://www.naver.com/",
					otherURLs: ["https://www.google.com/", "https://www.daum.net/"],
				}
				input.answerList.push("*".repeat(10000))
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				deepEqual(body.errors[0].message.startsWith("답변의 길이가 초과되었습니다."), true)
			})

			it("Failed request (invalid answerList length) / Should be return errors", async () => {
				const input = {
					studentId: 10217,
					name: "남승원",
					club: "emotion",
					answerList: ["", ""],
					phoneNumber: "01000000000",
					portfolioURL: "https://www.naver.com/",
					otherURLs: ["https://www.google.com/", "https://www.daum.net/"],
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				deepEqual(body.errors[0].message, "답변 문항의 개수가 올바르지 않습니다")
			})

			it("Failed request (invalid club name) / Should be return errors", async () => {
				const input = {
					studentId: 10217,
					name: "남승원",
					club: "emo",
					answerList: ["", "", ""],
					portfolioURL: "https://www.naver.com/",
					otherURLs: ["https://www.google.com/", "https://www.daum.net/"],
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(400)
				deepEqual(
					body.errors[0].message,
					'Variable "$input" got invalid value "emo" at "input.club"; Expected type Club. 동아리 이름은 nefus, layer7, unifox, teamlog, emotion 중 하나입니다'
				)
			})

			it("Failed request (too many requests) / Should be return errors", async () => {
				const input = {
					studentId: 10217,
					name: "남승원",
					club: "emotion",
					answerList: ["자소서 문항1", "자소서 문항2", "자소서 문항3"],
					phoneNumber: "01000000000",
					portfolioURL: "https://www.naver.com/",
					otherURLs: ["https://www.google.com/", "https://www.daum.net/"],
				}
				await redis.setex("canSubmit:::ffff:127.0.0.1", 60, "10")
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				deepEqual(body.errors[0].message.startsWith("너무 많이 요청했습니다."), true)
			})
		})
	})

	describe("Query getFormByClub", () => {
		const query = `
			query ($club: Club!, $cursor: ObjectID, $offset: Int! = 10) {
				getFormByClub(club: $club, cursor: $cursor, offset: $offset) {
					edges {
						cursor
						node {
							studentId
							name
							club
							answerList
							portfolioURL
							otherURLs
							formId
							date
						}
					}
					pageInfo {
						hasNextPage
						startCursor
						endCursor
					}
					totalCount
				}
			}
		`

		describe("Success", () => {
			it("Successful request (empty cursor) / Should be return FormConnection type", async () => {
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${token.emotion}`)
					.send(JSON.stringify({ query, variables: { club: "emotion", offset: 1 } }))
					.expect(200)
				const { edges, pageInfo, totalCount } = body.data.getFormByClub as FormConnection
				deepEqual(totalCount, 2)
				deepEqual(pageInfo.hasNextPage, true)
				deepEqual(pageInfo.startCursor, null)
				deepEqual(pageInfo.endCursor, edges[0].cursor)
				deepEqual(edges.length, 1)
			})

			it("Successful request (first cursor) / Should be return FormConnection type", async () => {
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${token.teacher}`)
					.send(JSON.stringify({ query, variables: { club: "emotion", cursor: formIds[0], offset: 1 } }))
					.expect(200)
				const { edges, pageInfo, totalCount } = body.data.getFormByClub as FormConnection
				deepEqual(totalCount, 2)
				deepEqual(pageInfo.hasNextPage, true)
				deepEqual(pageInfo.startCursor, formIds[0])
				deepEqual(pageInfo.endCursor, edges[0].cursor)
				deepEqual(edges.length, 1)
			})

			it("Successful request (last cursor) / Should be return FormConnection type", async () => {
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${token.teacher}`)
					.send(JSON.stringify({ query, variables: { club: "emotion", cursor: formIds[1], offset: 1 } }))
					.expect(200)
				const { edges, pageInfo, totalCount } = body.data.getFormByClub as FormConnection
				deepEqual(totalCount, 2)
				deepEqual(pageInfo.hasNextPage, false)
				deepEqual(pageInfo.startCursor, formIds[1])
				deepEqual(pageInfo.endCursor, null)
				deepEqual(edges.length, 0)
			})
		})

		describe("Failure", () => {
			it("Failed request (empty authorization headers) / Should be return errors", async () => {
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { club: "emotion", offset: 1 } }))
					.expect(200)
				deepEqual(body.errors[0].message, "Not Authorised!")
			})
		})
	})

	describe("Query getFormByStudentId", async () => {
		const query = `
			query ($studentId: StudentID!, $cursor: ObjectID, $offset: Int! = 10) {
				getFormByStudentId(studentId: $studentId, cursor: $cursor, offset: $offset) {
					edges {
						cursor
						node {
							studentId
							name
							club
							answerList
							portfolioURL
							otherURLs
							formId
							date
						}
					}
					pageInfo {
						hasNextPage
						startCursor
						endCursor
					}
					totalCount
				}
			}
		`

		describe("Success", () => {
			it("Successful request (empty cursor) / Should be return FormConnection type", async () => {
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${token.teacher}`)
					.send(JSON.stringify({ query, variables: { studentId: 10217, offset: 1 } }))
				const { edges, pageInfo, totalCount } = body.data.getFormByStudentId as FormConnection
				deepEqual(totalCount, 2)
				deepEqual(pageInfo.hasNextPage, true)
				deepEqual(pageInfo.startCursor, null)
				deepEqual(pageInfo.endCursor, edges[0].cursor)
				deepEqual(edges.length, 1)
			})

			it("Successful request (last cursor) / Should be return FormConnection type", async () => {
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${token.emotion}`)
					.send(JSON.stringify({ query, variables: { studentId: 10217, cursor: formIds[1], offset: 1 } }))
					.expect(200)
				const { edges, pageInfo, totalCount } = body.data.getFormByStudentId as FormConnection
				deepEqual(totalCount, 2)
				deepEqual(pageInfo.hasNextPage, false)
				deepEqual(pageInfo.startCursor, formIds[1])
				deepEqual(pageInfo.endCursor, null)
				deepEqual(edges.length, 0)
			})
		})

		describe("Failure", () => {
			it("Failed request (empty authorization headers) / Should be return errors", async () => {
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { studentId: 10217, offset: 1 } }))
					.expect(200)
				deepEqual(body.errors[0].message, "Not Authorised!")
			})
		})
	})

	describe("Mutation getStudentByClub", () => {
		const query = `
			query ($club: Club!) {
				getStudentByClub(club: $club) {
					studentId
					name
				}
			}
		`

		describe("Success", () => {
			it("Successful request / Should be return Array<Student>", async () => {
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${token.emotion}`)
					.send(JSON.stringify({ query, variables: { club: "emotion" } }))
					.expect(200)
				deepEqual(body.data.getStudentByClub.length, 1)
			})
		})
	})

	after(async () => {
		const db = (await mongoDB.get()) as Db
		await Promise.all([
			db.collection("form").deleteMany({ _id: { $in: formIds.map(id => new ObjectID(id)) } }),
			db.collection("user").deleteMany({ id: { $in: deletedUserIds } }),
		])
	})
})
