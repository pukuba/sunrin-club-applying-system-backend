import { Context } from "config"
import { env } from "config/env"
import { ApolloError } from "apollo-server-express"
import jwt from "jsonwebtoken"
import { LoginInput } from "./models"

export const login = async (parent: void, args: LoginInput, context: Context) => {
	const { id, password } = args.input
	const user = await context.db.collection("user").findOne({ id, password })
	if (user === null) {
		throw new ApolloError("아이디 혹은 비밀번호가 잘못되었습니다")
	}
	const token = jwt.sign({ role: user.role }, env.JWT_SECRET)
	return {
		role: user.role,
		token,
	}
}
