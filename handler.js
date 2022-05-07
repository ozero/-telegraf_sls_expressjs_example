const serverless = require("serverless-http");
const express = require("express");
const { Telegraf } = require("telegraf");

//-BOT--------

const BOT_TOKEN = process.env.BOT_TOKEN
if (BOT_TOKEN === undefined) {
  throw new Error('BOT_TOKEN must be provided!');
}

const bot = new Telegraf(BOT_TOKEN);
// Set the bot response
bot.on('text', (ctx) => {
  ctx.replyWithHTML('<b>Hello</b>');
  console.log(['ctx.replyWithHTML', ctx]);
});

const secretPath = `/`;
const restApiId = process.env.REST_API_ID;
const awsRegion = process.env.AWS_REGION; //予約語で使えるっぽい


//-EXPRESS--------

const app = express();

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.get("/setwebhook", async (req, res, next) => {
  // Set telegram webhook
  const URL = `https://${restApiId}.execute-api.${awsRegion}.amazonaws.com${secretPath}`;
  let url_for_telegram_api = `https://api.telegram.org/bot${BOT_TOKEN}/setWebHook?url=${URL}`;
  let result = await bot.telegram.setWebhook(url_for_telegram_api);
  console.log(["bot.telegram.setWebhook()", url_for_telegram_api]);

  return res.status(200).json({
    message: "Webhook set: " + JSON.stringify(result),
  });
});

//app.use(bot.webhookCallback(secretPath));

app.post("/", async (req, res, next) => {
  const context = JSON.parse(req.body.toString('utf8'));
  await bot.handleUpdate(context);
  console.log(["root POST", context]);
  return res.status(200).json({
    message: "ok",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
