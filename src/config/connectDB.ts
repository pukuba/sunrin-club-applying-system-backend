import { env } from "config"
import { MongoClient, Db } from "mongodb"

let db: Db | null = null
const connectDB = () => {
	const connect = async () => {
		try {
			const client = await MongoClient.connect(process.env.DB_HOST || env.MONGO_HOST, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			const _db = client.db()
			return _db
		} catch (e) {
			console.log(e)
			return null
		}
	}

	const get = async () => {
		try {
			if (db != null) {
				return db
			} else {
				console.log("getting new db connection")
				db = await connect()
				return db
			}
		} catch (e) {
			return e
		}
	}

	return { get }
}

export const mongoDB = connectDB()

import { createClient, OverloadedCommand } from "redis"

declare module "util" {
	function promisify<T, U, R>(
		fn: OverloadedCommand<T, U, R>
	): {
		(arg1: T, arg2: T | T[]): Promise<U>
		(arg1: T | T[]): Promise<U>
		(...args: Array<T>): Promise<U>
	}
}

import { promisify } from "util"

const redisClient = createClient(env.REDIS_HOST)
export const redis = {
	get: promisify(redisClient.get).bind(redisClient),
	setex: promisify(redisClient.setex).bind(redisClient),
	del: promisify(redisClient.del).bind(redisClient),
}
