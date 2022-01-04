import { Context } from "config"
import { MutationCreateAnswerArgs } from "config/models"

export const createAnswer = async (parent: void, args: MutationCreateAnswerArgs, context: Context) => {
	const { otherURLs, portfolioURL, ...data } = args.input

	const validForm = [400, 400, 400, 400, 400]
	const isValid =
		args.input.answerList.length === validForm.length &&
		validForm.every((len, idx) => {
			return args.input.answerList[idx].length <= len
		})

	if (!isValid) {
		const suggestion =
			args.input.answerList.length === validForm.length
				? "답변의 길이를 확인해주세요"
				: "답변의 개수를 확인해주세요"
		return {
			__typename: "CreateAnswerInvalidInputError",
			message: "잘못된 형식의 요청입니다",
			path: "createAnswer",
			suggestion,
			tracing: {
				message: `${args.input.club.toLowerCase()} 동아리 지원서 제출 실패 (학번 : ${
					args.input.studentId
				} / 이름 : ${args.input.name}) - 잘못된 형식`,
				role: args.input.club,
			},
		}
	}

	const document = {
		otherURLs: otherURLs.map(url => url.href),
		portfolioURL: portfolioURL?.href,
		...data,
		ip: context.ip,
		date: new Date(Date.now() + 1000 * 60 * 60 * 9).toISOString(),
	}
	const { insertedId: answerId } = await context.db.collection("answer").insertOne(document)
	return {
		__typename: "Answer",
		...document,
		answerId,
		tracing: {
			message: `${args.input.club.toLowerCase()} 동아리 지원서 제출 성공 (학번 : ${
				args.input.studentId
			} / 이름 : ${args.input.name})`,
			role: args.input.club,
		},
	}
}
