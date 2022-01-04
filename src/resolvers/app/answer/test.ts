import { deepStrictEqual as deepEqual } from "assert"
import request from "supertest"
import { Answer, AnswerConnection, RateLimitError, CreateAnswerInvalidInputError } from "config/models"
import appPromise from "app"
import { Server } from "http"
import { mongoDB, redis } from "config"
import { env } from "config/env"
import { Db, ObjectID } from "mongodb"
import jwt from "jsonwebtoken"

describe("Answer Service", () => {
	let app: Server
	let token: {
		teacher: string
		emotion: string
		invalid: string
	}
	const answerIds: string[] = []
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

	describe("Mutation createAnswer", () => {
		const query = `
				mutation ($input: CreateAnswerInput!) {
					createAnswer(input: $input) {
						... on Answer {
							studentId
							name
							club
							answerList
							portfolioURL
							otherURLs
							phoneNumber
							answerId
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
			it("Successful request (first time) / Should be return Answer type", async () => {
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
				const { answerId, date, ...data } = body.data.createAnswer as Answer
				answerIds.push(answerId)
				deepEqual(data, { ...input, __typename: "Answer" })
				deepEqual(typeof date, "string")
			})

			it("Successful request (second time) / Should be return Answer type", async () => {
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
				const { answerId, date, ...data } = body.data.createAnswer as Answer
				answerIds.push(answerId)
				deepEqual(data, { ...input, __typename: "Answer", portfolioURL: null })
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
				const { __typename, message, path, suggestion } = body.data
					.createAnswer as CreateAnswerInvalidInputError
				deepEqual(__typename, "CreateAnswerInvalidInputError")
				deepEqual(message, "잘못된 형식의 요청입니다")
				deepEqual(path, "createAnswer")
				deepEqual(suggestion, "답변의 길이를 확인해주세요")
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
				const { __typename, message, path, suggestion } = body.data
					.createAnswer as CreateAnswerInvalidInputError
				deepEqual(__typename, "CreateAnswerInvalidInputError")
				deepEqual(message, "잘못된 형식의 요청입니다")
				deepEqual(path, "createAnswer")
				deepEqual(suggestion, "답변의 개수를 확인해주세요")
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
				await redis.setex("createAnswer:::ffff:127.0.0.1", 60, "10")
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				const { afterTry, ...error } = body.data.createAnswer as RateLimitError
				deepEqual(error, {
					__typename: "RateLimitError",
					message: "너무 자주 요청했습니다",
					path: "createAnswer",
					suggestion: "잠시 후에 시도해주세요",
				})
				deepEqual(typeof afterTry, "number")
			})
		})
	})

	describe("Query getAnswerByClub", () => {
		const query = `
			query ($club: Club!, $cursor: ObjectID, $limit: UnsignedInt! = 10) {
				getAnswerByClub(club: $club, cursor: $cursor, limit: $limit) {
					edges {
						cursor
						node {
							studentId
							name
							club
							answerList
							portfolioURL
							otherURLs
							answerId
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
			it("Successful request (empty cursor) / Should be return AnswerConnection type", async () => {
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${token.emotion}`)
					.send(JSON.stringify({ query, variables: { club: "EMOTION", limit: 1 } }))
					.expect(200)
				const { edges, pageInfo, totalCount } = body.data.getAnswerByClub as AnswerConnection
				deepEqual(totalCount, 2)
				deepEqual(pageInfo.hasNextPage, true)
				deepEqual(pageInfo.startCursor, null)
				deepEqual(pageInfo.endCursor, edges[0].cursor)
				deepEqual(edges.length, 1)
			})

			it("Successful request (first cursor) / Should be return AnswerConnection type", async () => {
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${token.teacher}`)
					.send(JSON.stringify({ query, variables: { club: "EMOTION", cursor: answerIds[0], limit: 1 } }))
					.expect(200)
				const { edges, pageInfo, totalCount } = body.data.getAnswerByClub as AnswerConnection
				deepEqual(totalCount, 2)
				deepEqual(pageInfo.hasNextPage, true)
				deepEqual(pageInfo.startCursor, answerIds[0])
				deepEqual(pageInfo.endCursor, edges[0].cursor)
				deepEqual(edges.length, 1)
			})

			it("Successful request (last cursor) / Should be return AnswerConnection type", async () => {
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${token.teacher}`)
					.send(JSON.stringify({ query, variables: { club: "EMOTION", cursor: answerIds[1], limit: 1 } }))
					.expect(200)
				const { edges, pageInfo, totalCount } = body.data.getAnswerByClub as AnswerConnection
				deepEqual(totalCount, 2)
				deepEqual(pageInfo.hasNextPage, false)
				deepEqual(pageInfo.startCursor, answerIds[1])
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

	describe("Query getAnswerByStudentId", async () => {
		const query = `
			query ($studentId: StudentID!, $cursor: ObjectID, $limit: UnsignedInt! = 10) {
				getAnswerByStudentId(studentId: $studentId, cursor: $cursor, limit: $limit) {
					edges {
						cursor
						node {
							studentId
							name
							club
							answerList
							portfolioURL
							otherURLs
							answerId
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
			it("Successful request (empty cursor) / Should be return AnswerConnection type", async () => {
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${token.teacher}`)
					.send(JSON.stringify({ query, variables: { studentId: 10217, limit: 1 } }))
					.expect(200)
				const { edges, pageInfo, totalCount } = body.data.getAnswerByStudentId as AnswerConnection
				deepEqual(totalCount, 2)
				deepEqual(pageInfo.hasNextPage, true)
				deepEqual(pageInfo.startCursor, null)
				deepEqual(pageInfo.endCursor, edges[0].cursor)
				deepEqual(edges.length, 1)
			})

			it("Successful request (last cursor) / Should be return AnswerConnection type", async () => {
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${token.emotion}`)
					.send(JSON.stringify({ query, variables: { studentId: 10217, cursor: answerIds[1], limit: 1 } }))
					.expect(200)
				const { edges, pageInfo, totalCount } = body.data.getAnswerByStudentId as AnswerConnection
				deepEqual(totalCount, 2)
				deepEqual(pageInfo.hasNextPage, false)
				deepEqual(pageInfo.startCursor, answerIds[1])
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

	describe("Query getLiveAnswerStatus", () => {
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
			const { insertedIds } = await db.collection("answer").insertMany(inputData)
			for (const key in insertedIds) {
				answerIds.push(insertedIds[key])
			}
		})
		const query = `
			query {
				getLiveAnswerStatus{
					club
					answerCount
				}
			}
		`
		describe("Success", () => {
			it("Successful request / Should be return Array<AnswerStatus>", async () => {
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query }))
					.expect(200)
				deepEqual(body.data.getLiveAnswerStatus[0], {
					club: "UNIFOX",
					answerCount: 3,
				})
				deepEqual(body.data.getLiveAnswerStatus[1], {
					club: "EMOTION",
					answerCount: 2,
				})
				deepEqual(body.data.getLiveAnswerStatus[2], {
					club: "LAYER7",
					answerCount: 1,
				})
			})
		})
	})

	after(async () => {
		const db = (await mongoDB.get()) as Db
		await Promise.all([
			db.collection("answer").deleteMany({ _id: { $in: answerIds.map(id => new ObjectID(id)) } }),
			db.collection("user").deleteMany({ id: { $in: deletedUserIds } }),
		])
	})
})
