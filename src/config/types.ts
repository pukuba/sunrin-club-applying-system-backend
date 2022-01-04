import { ReadStream } from "fs"
import { RequireFields, Club } from "./models"

export interface File {
	filename: string
	mimetype: string
	encoding: string
	createReadStream: () => ReadStream
}

import { Db, ObjectID } from "mongodb"
import { redis as Redis } from "./connectDB"
export interface Context {
	db: Db
	redis: typeof Redis
	ip: string
	user: {
		id?: string
		role?: Club | "TEACHER"
	} | null
}

export type Role = Club | "TEACHER"

export type RequiredContext = RequireFields<Context, keyof Context>

export { ObjectID }

export interface PaginationInput {
	offset: number
	cursor: string | null
}
