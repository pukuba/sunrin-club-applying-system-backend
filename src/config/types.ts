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
		role?: ClubType | "teacher"
	} | null
}

export interface RequiredContext extends Context {
	user: {
		id: string
		role: ClubType | "teacher"
	}
}

export { ObjectID }

export interface PaginationInput {
	offset: number
	cursor: string | null
}

export type ClubType = "teamlog" | "emotion" | "layer7" | "nefus" | "unifox"