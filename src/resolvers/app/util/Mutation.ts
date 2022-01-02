import { MutationSendMessageArgs } from "config/models"
import { sendSMS } from "lib"

export const sendMessage = async (parent: void, args: MutationSendMessageArgs) => {
	const { message, phoneNumberList } = args.input
	if (phoneNumberList.length > 80) {
		return {
			__typename: "SendMessageInvalidInputError",
			message: "전송 메세지 개수 초과",
			suggestion: "한번에 전송하는 메세지를 80개 이하로 해야합니다",
		}
	}
	await sendSMS(phoneNumberList, message)
	return {
		__typename: "SendMessagePayload",
		message: "메세지 전송 성공",
		result: true,
	}
}
