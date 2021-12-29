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

export const decodeVerifyToken = (token: string) => {
	try {
		return (jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload).phoneNumber
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

export const getRandomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
