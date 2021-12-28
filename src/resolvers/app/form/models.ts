export interface CreateFormInput {
	input: {
		studentID: number
		club: "nefus" | "layer7" | "unifox" | "teamlog" | "emotion"
		name: string
		answerList: string[]
		portfolioURL: URL
		otherURLs: URL[]
	}
}
