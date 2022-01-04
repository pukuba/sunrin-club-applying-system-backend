import { deepStrictEqual as deepEqual } from "assert"
import request from "supertest"
import { Form, FormConnection, RateLimitError } from "config/models"
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
			{ id: "teacher11", password: "test", role: "TEACHER" },
			{ id: "emotion01", password: "test", role: "EMOTION" },
		]
		await db.collection("user").insertMany(obj)
		obj.forEach(x => deletedUserIds.push(x.id))
		token = {
			teacher: jwt.sign({ role: "TEACHER", id: "teacher11" }, env.JWT_SECRET),
			emotion: jwt.sign({ role: "EMOTION", id: "emotion01" }, env.JWT_SECRET),
			invalid: jwt.sign({ role: "TEACHER", id: "01010100" }, env.JWT_SECRET),
		}
	})

	describe("Mutation createForm", () => {
		const query = `
				mutation ($input: CreateFormInput!) {
					createForm(input: $input) {
						... on Form {
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
			it("Successful request (first time) / Should be return Form type", async () => {
				const input = {
					studentId: 10217,
					name: "남승원",
					club: "EMOTION",
					answerList: ["자소서 문항1", "자소서 문항2", "자소서 문항3", "자소서 문항4", "자소서 문항5"],
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
				deepEqual(data, { ...input, __typename: "Form" })
				deepEqual(typeof date, "string")
			})

			it("Successful request (second time) / Should be return Form type", async () => {
				const input = {
					studentId: 10217,
					name: "남승원",
					club: "EMOTION",
					answerList: ["자소서 문항1", "자소서 문항2", "자소서 문항3", "자소서 문항4", "자소서 문항5"],
					phoneNumber: "01000000000",
					otherURLs: ["https://www.google.com/", "https://www.daum.net/"],
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				const { formId, date, ...data } = body.data.createForm as Form
				formIds.push(formId)
				deepEqual(data, { ...input, __typename: "Form", portfolioURL: null })
				deepEqual(typeof date, "string")
			})
		})

		describe("Failure", () => {
			it("Failed request (payload is too large) / Should be return errors", async () => {
				const input = {
					studentId: 10217,
					name: "남승원",
					club: "EMOTION",
					answerList: ["", "", "", ""],
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
				deepEqual(body.data.createForm.__typename, "CreateFormInvalidInputError")
				deepEqual(body.data.createForm.message, "잘못된 형식의 요청입니다")
				deepEqual(body.data.createForm.path, "createForm")
				deepEqual(body.data.createForm.suggestion, "답변의 길이를 확인해주세요")
			})
			it("Failed request (invalid answerList length) / Should be return errors", async () => {
				const input = {
					studentId: 10217,
					name: "남승원",
					club: "EMOTION",
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
				deepEqual(body.data.createForm.__typename, "CreateFormInvalidInputError")
				deepEqual(body.data.createForm.message, "잘못된 형식의 요청입니다")
				deepEqual(body.data.createForm.path, "createForm")
				deepEqual(body.data.createForm.suggestion, "답변의 개수를 확인해주세요")
			})

			it("Failed request (invalid club name) / Should be return errors", async () => {
				const input = {
					studentId: 10217,
					name: "남승원",
					club: "emo",
					answerList: ["", "", "", "", ""],
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
					'Variable "$input" got invalid value "emo" at "input.club"; Value "emo" does not exist in "Club" enum.'
				)
			})

			it("Failed request (too many requests) / Should be return errors", async () => {
				const input = {
					studentId: 10217,
					name: "남승원",
					club: "EMOTION",
					answerList: ["자소서 문항1", "자소서 문항2", "자소서 문항3", "자소서 문항4", "자소서 문항5"],
					phoneNumber: "01000000000",
					portfolioURL: "https://www.naver.com/",
					otherURLs: ["https://www.google.com/", "https://www.daum.net/"],
				}
				await redis.setex("createForm:::ffff:127.0.0.1", 60, "10")
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				const { afterTry, ...error } = body.data.createForm as RateLimitError
				deepEqual(error, {
					__typename: "RateLimitError",
					message: "너무 자주 요청했습니다",
					path: "createForm",
					suggestion: "잠시 후에 시도해주세요",
				})
				deepEqual(typeof afterTry, "number")
			})
		})
	})

	describe("Query getFormByClub", () => {
		const query = `
			query ($club: Club!, $cursor: ObjectID, $limit: UnsignedInt! = 10) {
				getFormByClub(club: $club, cursor: $cursor, limit: $limit) {
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
					.send(JSON.stringify({ query, variables: { club: "EMOTION", limit: 1 } }))
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
					.send(JSON.stringify({ query, variables: { club: "EMOTION", cursor: formIds[0], limit: 1 } }))
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
					.send(JSON.stringify({ query, variables: { club: "EMOTION", cursor: formIds[1], limit: 1 } }))
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
					.send(JSON.stringify({ query, variables: { club: "EMOTION", limit: 1 } }))
					.expect(200)
				deepEqual(body.errors[0].message, "권한이 없습니다")
			})
		})
	})

	describe("Query getFormByStudentId", async () => {
		const query = `
			query ($studentId: StudentID!, $cursor: ObjectID, $limit: UnsignedInt! = 10) {
				getFormByStudentId(studentId: $studentId, cursor: $cursor, limit: $limit) {
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
					.send(JSON.stringify({ query, variables: { studentId: 10217, limit: 1 } }))
					.expect(200)
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
					.send(JSON.stringify({ query, variables: { studentId: 10217, cursor: formIds[1], limit: 1 } }))
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
					.send(JSON.stringify({ query, variables: { studentId: 10217, limit: 1 } }))
					.expect(200)
				deepEqual(body.errors[0].message, "권한이 없습니다")
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
					.send(JSON.stringify({ query, variables: { club: "EMOTION" } }))
					.expect(200)
				deepEqual(body.data.getStudentByClub.length, 1)
			})
		})
	})

	describe("Query getLiveFormStatus", () => {
		before(async () => {
			const db = (await mongoDB.get()) as Db
			const defaultObj = {
				name: "남승원",
				answerList: [["자소서 문항1", "자소서 문항2", "자소서 문항3", "자소서 문항4", "자소서 문항5"]],
				phoneNumber: "01000000000",
				portfolioURL: "https://github.com/pukuba/",
				otherURLs: ["https://www.google.com/", "https://www.daum.net/"],
			}
			const inputData = [
				{ ...defaultObj, studentId: 10216, club: "EMOTION" },
				{ ...defaultObj, studentId: 10212, club: "LAYER7" },
				{ ...defaultObj, studentId: 10201, club: "UNIFOX" },
				{ ...defaultObj, studentId: 10101, club: "UNIFOX" },
				{ ...defaultObj, studentId: 10105, club: "UNIFOX" },
			]
			const { insertedIds } = await db.collection("form").insertMany(inputData)
			for (const key in insertedIds) {
				formIds.push(insertedIds[key])
			}
		})
		const query = `
			query {
				getLiveFormStatus{
					club
					formCount
				}
			}
		`
		describe("Success", () => {
			it("Successful request / Should be return Array<FormStatus>", async () => {
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query }))
					.expect(200)
				deepEqual(body.data.getLiveFormStatus[0], {
					club: "UNIFOX",
					formCount: 3,
				})
				deepEqual(body.data.getLiveFormStatus[1], {
					club: "EMOTION",
					formCount: 2,
				})
				deepEqual(body.data.getLiveFormStatus[2], {
					club: "LAYER7",
					formCount: 1,
				})
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
