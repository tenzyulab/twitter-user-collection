import * as dotenv from 'dotenv'

dotenv.config()

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const APP_KEY = process.env['TWITTER_APP_KEY']!
export const APP_SECRET = process.env['TWITTER_APP_SECRET']!
export const ACCESS_TOKEN = process.env['TWITTER_ACCESS_TOKEN']!
export const ACCESS_SECRET = process.env['TWITTER_ACCESS_SECRET']!
export const BEARER_TOKEN = process.env['TWITTER_BEARER_TOKEN']!

export const WEBHOOK_URL = process.env['DISCORD_WEBHOOK_URL']!
export const ID_TO_MENTION = process.env['DISCORD_ID_TO_MENTION']!

export const RULE_1 = { add: [{ tag: '1', value: process.env['RULE_1']! }] }
export const LIST_ID_1 = process.env['LIST_ID_1']!
/* eslint-enable @typescript-eslint/no-non-null-assertion */
