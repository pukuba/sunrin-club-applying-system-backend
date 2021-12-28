export const env = {
	DB_HOST: process.env.DB_HOST || "mongodb://localhost:27017/test",
	PORT: process.env.PORT || 3000,
	NODE_ENV: process.env.NODE_ENV || "development",
}
