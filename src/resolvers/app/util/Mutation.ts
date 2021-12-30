import { MutationSendMessageArgs } from "config/models"
import { sendSMS } from "lib"

export const sendMessage = async (parent: void, args: MutationSendMessageArgs) => {
	const { message, phoneNumberList } = args.input
	const res = await sendSMS(phoneNumberList, message)
	return res.statusName === "success"
}
