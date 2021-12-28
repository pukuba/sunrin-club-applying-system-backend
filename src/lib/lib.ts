import jwt from "jsonwebtoken"
import { env } from "config/env"

export const decodeToken = (token?: string) => {
	if (!token) return null
	try {
		return jwt.verify(token, env.JWT_SECRET)
	} catch {
		return null
	}
}
