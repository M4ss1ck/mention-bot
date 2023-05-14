import { Composer } from "tgsnake"
import { logger } from "../logger/winston.js"

export const mention = new Composer()

mention.command('all', async ctx => {
    try {
        if (ctx.chat.id && ctx.from.id) {
            const { status } = await ctx.telegram.getParticipant(ctx.chat.id, ctx.from.id.toString())
            if (status === 'creator' || status === 'admin') {
                await ctx.reply('calling everybody...')
                const users = await ctx.telegram.getChatMembers(ctx.chat.id)
                if (users) {
                    const replyTo = ctx.replyToMessage ? ctx.replyToMessage.id : ctx.id
                    const toMention = users.participants.map(u => u.user).filter(u => !u.self && !u.deleted && !u.bot)
                    const msgAmount = Math.ceil(toMention.length / 3)
                    for (let i = 0; i < msgAmount; i++) {
                        let msg = '<i>Calling...</i> '
                        let user1 = toMention[i * 3]
                        let user2 = toMention[1 + i * 3]
                        let user3 = toMention[2 + i * 3]
                        logger.debug([user1, user2, user3])
                        if (user1) msg += ` <a href="tg://user?id=${user1.id.toString()}">${user1.firstName ? user1.firstName : user1.id.toString()}</a>`
                        if (user2) msg += ` <a href="tg://user?id=${user2.id.toString()}">${user2.firstName ? user2.firstName : user2.id.toString()}</a>`
                        if (user3) msg += ` <a href="tg://user?id=${user3.id.toString()}">${user3.firstName ? user3.firstName : user3.id.toString()}</a>`
                        ctx.replyWithHTML(msg, {
                            replyToMsgId: replyTo,
                        })
                    }
                }
            }
        }
    } catch (error) {
        logger.error(error)
    }
})

mention.command(['help', 'start'], async ctx => {
    ctx.replyWithHTML(`Administrators can use this bot to call all members of a group by using <code>/all</code>.\n\nOther commands <i>soon</i>™\n\nThis bot is <a href="https://github.com/M4ss1ck/mention-bot">open source</a>.`, {
        noWebpage: true,
    })
})