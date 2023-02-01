import { TwitterApi } from 'twitter-api-v2'
import {
  ACCESS_SECRET,
  ACCESS_TOKEN,
  APP_KEY,
  APP_SECRET,
  BEARER_TOKEN,
} from './constants'

export const v1Client = new TwitterApi({
  appKey: APP_KEY,
  appSecret: APP_SECRET,
  accessToken: ACCESS_TOKEN,
  accessSecret: ACCESS_SECRET,
}).readWrite.v1

export const v2Client = new TwitterApi(BEARER_TOKEN).readOnly.v2
