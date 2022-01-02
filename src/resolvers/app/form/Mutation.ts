import { Context } from "config"
import { MutationCreateFormArgs } from "config/models"

export const createForm = async (parent: void, args: MutationCreateFormArgs, context: Context) => {
	const { otherURLs, portfolioURL, ...data } = args.input

	const validForm = [400, 400, 400, 400, 400]
	const isValid =
		args.input.answerList.length === validForm.length &&
		validForm.every((len, idx) => {
			return args.input.answerList[idx].length <= len
		})

	if (!isValid) {
		return {
			__typename: "CreateFormInvalidInputError",
			message: "잘못된 형식의 요청입니다",
			path: "createForm",
			suggestion: "정확한 형식의 요청을 다시 시도해주세요",
			tracing: {
				message: `${args.input.club} 동아리 지원서 제출 실패 (학번 : ${args.input.studentId} / 이름 : ${args.input.name}) - 잘못된 형식`,
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
	const { insertedId: formId } = await context.db.collection("form").insertOne(document)
	return {
		__typename: "Form",
		...document,
		formId,
		tracing: {
			message: `${args.input.club} 동아리 지원서 제출 성공 (학번 : ${args.input.studentId} / 이름 : ${args.input.name})`,
			role: args.input.club,
		},
	}
}
