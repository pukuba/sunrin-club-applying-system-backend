import { Context } from "config"
import { env } from "config/env"
import jwt from "jsonwebtoken"
import { MutationLoginArgs } from "config/models"

export const login = async (parent: void, args: MutationLoginArgs, context: Context) => {
	const { id, password } = args.input
	const user = await context.db.collection("user").findOne({ id, password })
	if (user === null) {
		return {
			__typename: "InvalidAccountError",
			message: "아이디 혹은 비밀번호가 잘못되었습니다",
			path: "login",
			suggestion: "계정을 다시 확인해주세요",
		}
	}
	const token = jwt.sign({ role: user.role, id: id }, env.JWT_SECRET)
	return {
		__typename: "User",
		role: user.role,
		token,
	}
}
