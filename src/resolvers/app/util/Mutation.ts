import { Context } from "config"
import { MutationSendMessageArgs } from "config/models"
import { sendSMS } from "lib"

export const sendMessage = async (parent: void, args: MutationSendMessageArgs, context: Context) => {
	const { message, phoneNumberList } = args.input
	const res = await sendSMS(phoneNumberList, message)
	return res.statusName === "success"
}
