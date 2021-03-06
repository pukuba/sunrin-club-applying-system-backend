import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils"
import { defaultFieldResolver, GraphQLSchema } from "graphql"
import { Context } from "config"
import { RequireFields } from "config/models"

export function ratelimitDirectiveTransformer(schema: GraphQLSchema, directiveName: string) {
	return mapSchema(schema, {
		[MapperKind.OBJECT_FIELD]: fieldConfig => {
			const ratelimitDirective = getDirective(schema, fieldConfig, directiveName)?.[0]
			if (ratelimitDirective) {
				const { max } = ratelimitDirective
				const { resolve } = fieldConfig as { resolve: typeof defaultFieldResolver }
				fieldConfig.resolve = async function (source, args, context: Context, info) {
					const keyType =
						ratelimitDirective.keyType === "IP"
							? context.ip
							: (context as RequireFields<Context, "user">).user.role

					const key = `${ratelimitDirective.key}:${keyType}`
					const count = await context.redis.get(key)
					if (count && count >= max) {
						const ttl = await context.redis.ttl(key)
						return {
							__typename: "RateLimitError",
							message: "너무 자주 요청했습니다",
							path: info.fieldName,
							suggestion: "잠시 후에 시도해주세요",
							afterTry: ttl,
						}
					}
					if (count === null) {
						await context.redis.setex(key, ratelimitDirective.ttl, "1")
					} else {
						await context.redis.incr(key)
					}
					const res = await resolve(source, args, context, info)
					return res
				}
				return fieldConfig
			}
		},
	})
}
