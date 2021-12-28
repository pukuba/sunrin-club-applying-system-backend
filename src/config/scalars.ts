import { UserInputError } from "apollo-server-errors"
import { GraphQLScalarType, Kind } from "graphql"

const isValidStudentID = (value: any) => {
	if (typeof value !== "number") {
		throw new UserInputError("학번은 number 타입이여야 합니다")
	}
	// 10101 1학년 1반 1번
	// 10350 1학년 3반 50번
	if (!(10101 <= value && value <= 10350)) {
		throw new UserInputError("잘못된 학번입니다 학번은 10101 ~ 10350 사이입니다")
	}
	return true
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
	const regex = /^(nefus|layer7|unifox|teamlog|emotion))$/
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