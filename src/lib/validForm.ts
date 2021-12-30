import { ApolloError } from "apollo-server-express"

const createError = (message: string) => new ApolloError(message)

export const validEmotion = (answerList: string[]) => {
	const limits = [300, 500, 1000]
	if (answerList.length !== 3) {
		return createError("답변 문항의 개수가 올바르지 않습니다")
	}
	return (
		answerList.every((answer, index) => {
			return answer.length <= limits[index]
		}) || createError(`답변의 길이가 초과되었습니다. 글자 수 제한 문항별: ${limits.join(", ")}자`)
	)
}
