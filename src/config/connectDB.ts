import { env } from "config/env"
import { MongoClient, Db } from "mongodb"

let db: Db | null = null
const connectDB = () => {
	const connect = async () => {
		try {
			const client = await MongoClient.connect(env.NODE_ENV ? "mongodb://localhost:27017/test" : env.MONGO_HOST, {
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
			if (db !== null) {
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

import { createClient } from "redis"

import { promisify } from "util"

const redisClient = createClient(env.NODE_ENV === "test" ? "redis://localhost" : env.REDIS_HOST)
export const redis = {
	get: promisify(redisClient.get).bind(redisClient),
	setex: promisify(redisClient.setex).bind(redisClient),
	del: promisify(redisClient.del).bind(redisClient),
	ttl: promisify(redisClient.ttl).bind(redisClient),
	incr: promisify(redisClient.incr).bind(redisClient),
	publish: promisify(redisClient.publish).bind(redisClient),
	subscribe: promisify(redisClient.subscribe).bind(redisClient),
}
