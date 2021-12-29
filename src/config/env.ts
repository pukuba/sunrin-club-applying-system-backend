export const env = {
	MONGO_HOST: process.env.MONGO_HOST || "mongodb://localhost:27017/test",
	PORT: process.env.PORT || 3000,
	NODE_ENV: process.env.NODE_ENV || "development",
	REDIS_HOST: process.env.REDIS_HOST || "redis://localhost",
	JWT_SECRET: process.env.JWT_SECRET || "front-memory",
	NCP_ACCESS_KEY: process.env.NCP_ACCESS_KEY || "",
	NCP_SECRET_KEY: process.env.NCP_SECRET_KEY || "",
	NCP_SMS_KEY: process.env.NCP_SMS_KEY || "",
	PHONE_NUMBER: process.env.PHONE_NUMBER || "",
	MY_PHONE: process.env.MY_PHONE || "",
}
