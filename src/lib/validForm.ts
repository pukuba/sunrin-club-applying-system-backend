export const validEmotion = (answerList: string[]) => {
	const limits = [300, 500, 1000]
	if (answerList.length !== 3) {
		return false
	}
	return answerList.every((answer, index) => {
		return answer.length <= limits[index]
	})
}
