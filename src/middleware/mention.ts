import { Composer } from "tgsnake"

export const mention = new Composer()

mention.command('all', async ctx => {
    await ctx.reply('calling everybody...')
    if (ctx.chat.id) {
        const users = await ctx.telegram.getChatMembers(ctx.chat.id)
        if (users) {
            const toMention = users.participants.map(u => u.user).filter(u => !u.self && !u.deleted && !u.bot)
            console.log(toMention)
            const msgAmount = Math.ceil(toMention.length / 3)
            for (let i = 0; i < msgAmount; i++) {
                let msg = '<i>Calling...</i> '
                let user1 = toMention[1 + i * 3]
                let user2 = toMention[2 + i * 3]
                let user3 = toMention[3 + i * 3]
                if (user1) msg += ` <a href="tg://user?id=${user1.id.toString()}">${user1.firstName ? user1.firstName : user1.id.toString()}</a>`
                if (user2) msg += ` <a href="tg://user?id=${user2.id.toString()}">${user2.firstName ? user2.firstName : user2.id.toString()}</a>`
                if (user3) msg += ` <a href="tg://user?id=${user3.id.toString()}">${user3.firstName ? user3.firstName : user3.id.toString()}</a>`
                ctx.replyWithHTML(msg)
            }
        }
    }
})