const dayjs = require('dayjs')
const Discord = require('discord.js')
const { IncomingWebhook } = require('@slack/webhook')
const client = new Discord.Client()

const discordBotToken = process.env.DISCORD_BOT_TOKEN
const slackWebhookURL = process.env.SLACK_WEBHOOK_URL

if (discordBotToken == undefined || slackWebhookURL == undefined) {
  console.error('Environment variables are not defined...')
  process.exit(1)
}

const webhook = new IncomingWebhook(slackWebhookURL)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', (message) => {
  if (
    message.mentions.has(client.user.id) &&
    message.content.includes('ping')
  ) {
    message.reply('うつになった...')
  }
})

client.on('voiceStateUpdate', (oldMember, newMember) => {
  if (oldMember.channelID == undefined && newMember.channelID !== undefined) {
    webhook.send({
      attachments: [
        {
          color: 'good',
          author_icon: newMember.member.user.avatarURL().replace('webp', 'png'),
          author_name: `${newMember.member.user.username}#${newMember.member.user.discriminator}`,
          title: `:loud_sound: ${newMember.channel.name} に参加しました`,
          ts: dayjs().unix(),
        },
      ],
    })
  }

  if (oldMember.channelID !== undefined && newMember.channelID == undefined) {
    webhook.send({
      attachments: [
        {
          color: 'danger',
          author_icon: oldMember.member.user.avatarURL().replace('webp', 'png'),
          author_name: `${oldMember.member.user.username}#${oldMember.member.user.discriminator}`,
          title: `:loud_sound: ${oldMember.channel.name} から離脱しました`,
          ts: dayjs().unix(),
        },
      ],
    })
  }
})

client.login(discordBotToken)
