import { Context } from "config"
import { env } from "config/env"
import { ApolloError } from "apollo-server-express"
import jwt from "jsonwebtoken"
import { MutationLoginArgs } from "config/models"

export const login = async (parent: void, args: MutationLoginArgs, context: Context) => {
	const { id, password } = args.input
	const user = await context.db.collection("user").findOne({ id, password })
	if (user === null) {
		throw new ApolloError("아이디 혹은 비밀번호가 잘못되었습니다", undefined, {
			action: "로그인",
			message: `아이디 혹은 비밀번호 오류 (아이디 : ${id})`,
			club: args.input.id,
		})
	}
	const token = jwt.sign({ role: user.role, id: id }, env.JWT_SECRET)
	return {
		role: user.role,
		token,
	}
}
