import { ReadStream } from "fs"

export interface File {
	filename: string
	mimetype: string
	encoding: string
	createReadStream: () => ReadStream
}

import { Db } from "mongodb"

export interface Context {
	db: Db
}
