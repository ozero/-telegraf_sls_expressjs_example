
# Telegraf.js example with Serverless Framework Node Express API on AWS 

based on : [Serverless Framework Node Express API on AWS](https://www.serverless.com/examples/aws-node-express-api)


## Setup

### Telegram bot token

- Create a new bot with [@BotFather](https://t.me/BotFather), then get bot_token.
- Copy `serverless-env-dev.yml` from sample.

```
cp serverless-env-dev.yml.sample serverless-env-dev.yml
```

- Open `serverless-env-dev.yml` and paste the value into BOT_TOKEN you got above.

### Configure env vars
- Copy `serverless.yml` from sample.

```
cp serverless.yml.sample serverless.yml
```

- Open `serverless.yml` and Edit `YOURNAME`, `MY-APPNAME`
- Then do first deploy

```
sls deploy --stage dev
```

- Open AWS management console and check the Lambda function you deployed.
- Check the API Gateway that integrated with your Lambda function.
- Make sure its end point url. `https://<REST_API_ID>.execute-api.<AWS_REGION>.amazonaws.com/`
- Open `serverless-env-dev.yml` and paste the value REST_API_ID you got above.
- Then deploy again

```
sls deploy --stage dev
```

### Tell webhook url to Telegram API

- Open url in your web brouwser. `https://<REST_API_ID>.execute-api.<AWS_REGION>.amazonaws.com/setwebhook`
- Then start with your bot, type any text.


### Update only the code

```
sls deploy function --function api --stage dev
```

### Deploy to production

- Make sure `serverless-env-production.yml` is correct.
- Command to deploy is below

```
sls deploy --stage production
```

