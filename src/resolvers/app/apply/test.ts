import { deepStrictEqual as deepEqual } from "assert"
import request from "supertest"
import { Form } from "config/models"
import appPromise from "app"
import { Server } from "http"

describe("Apply Service", () => {
	let app: Server
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
		it("should be return Form type", async () => {
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
			const data = body.data.createForm as Form
			deepEqual(data.studentId, input.studentId)
			deepEqual(data.name, input.name)
			deepEqual(data.club, input.club)
			deepEqual(data.answerList, input.answerList)
			deepEqual(data.portfolioURL, input.portfolioURL)
			deepEqual(data.otherURLs, input.otherURLs)
		})
	})
})
