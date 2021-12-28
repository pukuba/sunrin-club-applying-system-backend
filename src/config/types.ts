import { ReadStream } from "fs"

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
		role?: "teamlog" | "teacher" | "emotion" | "layer7" | "nefus" | "unifox"
	} | null
}

export { ObjectID }

export interface PaginationInput {
	offset: number
	cursor: string | null
}
