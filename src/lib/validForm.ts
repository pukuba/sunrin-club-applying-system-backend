import { ApolloError } from "apollo-server-express"

const createError = (message: string, club: string) =>
	new ApolloError(message, undefined, {
		club,
		action: "지원서 제출",
	})

export const validEmotion = (answerList: string[], club: string) => {
	const limits = [400, 400, 400, 400, 400]
	if (answerList.length !== limits.length) {
		return createError("답변 문항의 개수가 올바르지 않습니다", club)
	}
	return (
		answerList.every((answer, index) => {
			return answer.length <= limits[index]
		}) || createError(`답변의 길이가 초과되었습니다. 글자 수 제한 문항별: ${limits.join(", ")}자`, club)
	)
}
