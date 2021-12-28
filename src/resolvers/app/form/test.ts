import { deepStrictEqual as deepEqual } from "assert"
import request from "supertest"
import { Form } from "config/models"
import appPromise from "app"
import { Server } from "http"
import { mongoDB } from "config"
import { Db, ObjectID } from "mongodb"

describe("Form Service", () => {
	let app: Server
	const deletedIds: string[] = []
	before(async () => {
		app = await appPromise
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
						formId
					}
				}
			`
		describe("Success", () => {
			it("Successful request / Should be return Form type", async () => {
				const input = {
					studentId: 10217,
					name: "남승원",
					club: "emotion",
					answerList: ["자소서 문항1", "자소서 문항2", "자소서 문항3"],
					portfolioURL: "https://www.naver.com/",
					otherURLs: ["https://www.google.com/", "https://www.daum.net/"],
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				const { formId, ...data } = body.data.createForm as Form
				deletedIds.push(formId)
				deepEqual(data, input)
			})
		})

		describe("Failure", () => {
			it("Failed request (payload is too large) / Should be return errors", async () => {
				const input = {
					studentId: 10217,
					name: "남승원",
					club: "emotion",
					answerList: ["", ""],
					portfolioURL: "https://www.naver.com/",
					otherURLs: ["https://www.google.com/", "https://www.daum.net/"],
				}
				input.answerList.push("*".repeat(10000))
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				deepEqual(body.errors[0].message, "답변의 길이가 초과되었습니다. 글자 수 제한 문항별: 300, 500, 1000자")
			})

			it("Failed request (invalid answerList length) / Should be return errors", async () => {
				const input = {
					studentId: 10217,
					name: "남승원",
					club: "emotion",
					answerList: ["", ""],
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
		})
	})

	after(async () => {
		const db = (await mongoDB.get()) as Db
		await db.collection("form").deleteMany({ _id: { $in: deletedIds.map(id => new ObjectID(id)) } })
	})
})
