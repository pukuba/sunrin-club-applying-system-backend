import { UserInputError } from "apollo-server-errors"
import { GraphQLScalarType, Kind } from "graphql"

const isValidStudentID = (value: any) => {
	if (typeof value !== "number") {
		throw new UserInputError("학번은 number 타입이여야 합니다")
	}
	// 10101 1학년 1반 1번
	// 10329 1학년 3반 29번
	if (!(/^10[1-3][0-2][0-9]$/.test(value.toString()) && value % 100 !== 0 )) {
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
		return new UserInputError("학번은 INT 타입이여야 합니다")
	},
})

const isValidClub = (value: any) => {
	const regex = /^(nefus|layer7|unifox|teamlog|emotion)$/
	if (typeof value !== "string") {
		throw new UserInputError("동아리는 string 타입이여야 합니다")
	}
	if (regex.test(value) === false) {
		throw new UserInputError("동아리 이름은 nefus, layer7, unifox, teamlog, emotion 중 하나입니다")
	}
	return value
}

export const Club = new GraphQLScalarType({
	name: "Club",
	description: "동아리 eg) nefus, layer7, unifox, teamlog, emotion",
	parseValue: isValidClub,
	serialize: isValidClub,
	parseLiteral(ast) {
		if (ast.kind === Kind.STRING) {
			return isValidClub(ast.value)
		}
		return new UserInputError("동아리는 string 타입이여야 합니다")
	},
})
