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
      text: `*${newMember.member.user.username}* が :loud_sound: *${newMember.channel.name}* に参加しました`,
    })
  }

  if (oldMember.channelID !== undefined && newMember.channelID == undefined) {
    webhook.send({
      text: `*${oldMember.member.user.username}* が :loud_sound: *${oldMember.channel.name}* から離脱しました`,
    })
  }
})

client.login(discordBotToken)
