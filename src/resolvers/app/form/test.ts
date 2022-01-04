import { deepStrictEqual as deepEqual } from "assert"
import request from "supertest"
import { Form, InvalidFormError } from "config/models"
import appPromise from "app"
import { Server } from "http"
import { mongoDB } from "config"
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
	let updatedAt: string
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
	describe("Mutation upsertForm", () => {
		const query = `
			mutation ($input: UpsertFormInput!) {
				upsertForm(input: $input){
					club
					introduce
					formId
					latestUpdatedAt
					question {
						message
						length
					}
					__typename
				}
			}
		`
		describe("Success", () => {
			it("Successful request (created form) / Should be return Form", async () => {
				const input = {
					introduce: "안녕하세요 동아리 이모션입니다.",
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${token.emotion}`)
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				const { latestUpdatedAt, formId, ...data } = body.data.upsertForm as Form
				deepEqual(data, {
					club: "EMOTION",
					question: [],
					introduce: "안녕하세요 동아리 이모션입니다.",
					__typename: "Form",
				})
				deepEqual(typeof new Date(latestUpdatedAt), "object")
				formIds.push(formId)
			})

			it("Successful request (update qeustion) / Should be return Form", async () => {
				const input = {
					question: [{ message: "동아리를 지원한 이유가?", length: 400 }],
				}
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", `Bearer ${token.emotion}`)
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				const { latestUpdatedAt, formId, ...data } = body.data.upsertForm as Form
				deepEqual(data, {
					club: "EMOTION",
					question: [{ message: "동아리를 지원한 이유가?", length: 400 }],
					introduce: "안녕하세요 동아리 이모션입니다.",
					__typename: "Form",
				})
				deepEqual(typeof latestUpdatedAt, "string")
				deepEqual(formId, formIds[0])
				updatedAt = latestUpdatedAt
			})
		})

		describe("Failure", () => {
			it("Failed request (invalid authorization) / Should be return errors", async () => {
				const input = { question: [] }
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.set("Authorization", "Bearer 123")
					.send(JSON.stringify({ query, variables: { input } }))
					.expect(200)
				deepEqual(body.errors[0].message, "권한이 없습니다")
			})
		})
	})

	describe("Query getFormByClub", () => {
		const query = `
			query ($club: Club!) {
				getFormByClub (club: $club) {
					__typename
					... on InvalidFormError {
						message
						path
						suggestion
					}
					... on Form {
						club
						introduce
						formId
						latestUpdatedAt
						question {
							message
							length
						}
					}
				}
			}
		`
		describe("Success", () => {
			it("Successful request / Should be return Form", async () => {
				const club = "EMOTION"
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { club } }))
					.expect(200)
				const data = body.data.getFormByClub as Form
				deepEqual(data, {
					__typename: "Form",
					club: "EMOTION",
					introduce: "안녕하세요 동아리 이모션입니다.",
					formId: formIds[0],
					latestUpdatedAt: updatedAt,
					question: [{ message: "동아리를 지원한 이유가?", length: 400 }],
				})
			})
		})

		describe("Failure", async () => {
			it("Failed request (form is create not yet) / Should be return InvalidFormError", async () => {
				const club = "LAYER7"
				const { body } = await request(app)
					.post("/api")
					.set("Content-Type", "application/json")
					.send(JSON.stringify({ query, variables: { club } }))
					.expect(200)
				const error = body.data.getFormByClub as InvalidFormError
				deepEqual(error, {
					__typename: "InvalidFormError",
					message: "layer7 동아리의 지원 양식이 아직 존재하지 않습니다",
					path: "getFormByClub",
					suggestion: "layer7 동아리에 문의해주세요",
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
