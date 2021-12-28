export const env = {
	MONGO_HOST: process.env.MONGO_HOST || "mongodb://localhost:27017/test",
	PORT: process.env.PORT || 3000,
	NODE_ENV: process.env.NODE_ENV || "development",
	REDIS_HOST: process.env.REDIS_HOST || "redis://localhost",
}
