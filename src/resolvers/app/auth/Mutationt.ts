import { Context } from "config"
import { env } from "config/env"
import { ApolloError } from "apollo-server-express"
import jwt from "jsonwebtoken"
import { sendSMS } from "lib"
import { MutationLoginArgs, MutationSendVerifyCodeArgs, MutationCheckVerifyCodeArgs } from "config/models"

export const login = async (parent: void, args: MutationLoginArgs, context: Context) => {
	const { id, password } = args.input
	const user = await context.db.collection("user").findOne({ id, password })
	if (user === null) {
		throw new ApolloError("아이디 혹은 비밀번호가 잘못되었습니다")
	}
	const token = jwt.sign({ role: user.role, id: id }, env.JWT_SECRET)
	return {
		role: user.role,
		token,
	}
}

const getRandomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export const sendVerifyCode = async (parent: void, args: MutationSendVerifyCodeArgs, context: Context) => {
	const random = getRandomNumber(100000, 999999)
	const { phoneNumber } = args.input
	const message = `[선린인터넷고등학교 정보보호과] 동아리 지원 본인확인 인증번호 : ${random} 를 화면에 입력해주세요`
	const res = await sendSMS([phoneNumber], message)
	await context.redis.setex(`verifyCode:${phoneNumber}`, 300, `${random}`)
	return res.statusName === "success"
}

export const checkVerifyCode = async (parent: void, args: MutationCheckVerifyCodeArgs, context: Context) => {
	const { phoneNumber, verifyCode } = args.input
	const redisRes = await context.redis.get(`verifyCode:${phoneNumber}`)
	if (redisRes === null) {
		throw new ApolloError("인증번호가 유효하지 않습니다")
	}
	if (redisRes === verifyCode) {
		await context.redis.del(`verifyCode:${phoneNumber}`)
		return jwt.sign({ phoneNumber: phoneNumber }, env.JWT_SECRET, {
			expiresIn: "1h",
		})
	}
	throw new ApolloError("인증번호가 유효하지 않습니다")
}
