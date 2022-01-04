import { UserInputError } from "apollo-server-errors"
import { GraphQLScalarType, Kind } from "graphql"

const isValidStudentID = (value: any) => {
	if (typeof value !== "number") {
		throw new UserInputError("학번은 number 타입이여야 합니다")
	}
	// 10101 1학년 1반 1번
	// 10329 1학년 3반 29번
	if (!(/^10[1-3][0-2][0-9]$/.test(value.toString()) && value % 100 !== 0)) {
		throw new UserInputError("잘못된 학번입니다 반은 01 ~ 03 번호는 01 ~ 29 까지 유효합니다")
	}
	return value
}

export const StudentID = new GraphQLScalarType({
	name: "StudentID",
	description: "학번 eg) 10311 이는 1학년 3반 11번을 나타냅니다",
	parseValue: isValidStudentID,
	serialize: isValidStudentID,
	parseLiteral(ast) {
		if (ast.kind === Kind.INT) {
			return isValidStudentID(ast.value)
		}
		throw new UserInputError("학번은 INT 타입이여야 합니다")
	},
})

const isValidIP = (value: any) => {
	if (typeof value !== "string") {
		throw new UserInputError("IP는 string 타입이여야 합니다")
	}
	const isValid =
		/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/.test(
			value
		)
	if (isValid === false) {
		throw new UserInputError("IP는 IPv4 혹은 IPv6 형식에 맞아야합니다")
	}
	return value
}

export const IP = new GraphQLScalarType({
	name: "IP",
	description: "IPv4 혹은 IPv6",
	parseValue: isValidIP,
	serialize: isValidIP,
	parseLiteral(ast) {
		if (ast.kind === Kind.STRING) {
			return isValidIP(ast.value)
		}
		throw new UserInputError("IP는 String 타입이여야 합니다")
	},
})
