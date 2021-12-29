import jwt from "jsonwebtoken"
import { env } from "config/env"

export const decodeToken = (token?: string) => {
	if (!token) return null
	try {
		return jwt.verify(token.split(" ")[1], env.JWT_SECRET)
	} catch {
		return null
	}
}

import ncpsdk from "ncp-sdk"
const ncp = new ncpsdk({
	accessKey: env.NCP_ACCESS_KEY,
	secretKey: env.NCP_SECRET_KEY,
	smsKey: env.NCP_SMS_KEY,
})

export const sendSMS = async (phoneNumberList: string[], message: string) => {
	return await ncp.sendSMS({
		sender: env.PHONE_NUMBER,
		receiver: phoneNumberList,
		content: message,
	})
}
