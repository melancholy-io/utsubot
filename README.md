# utsubot

utsubot は、Discord のボイスチャンネルの入退室を Slack に通知する bot です。

## Usage

### macOS / Linux

```sh
$ DISCORD_BOT_TOKEN="XXX" SLACK_WEBHOOK_URL="XXX" node index.js
```

### Docker

```sh
$ touch .env
$ echo -e "DISCORD_BOT_TOKEN=\"XXX\"" >> .env
$ echo -e "SLACK_WEBHOOK_URL=\"XXX\"" >> .env
$ docker-compose up -d
```

## Icon

<p>
  <img src="icon.png" width="128" height="128" alt="icon">
</p>

Drawn by [@daisan-me](https://github.com/daisan-me)
