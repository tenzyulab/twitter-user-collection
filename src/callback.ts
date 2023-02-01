import fetch from 'node-fetch'
import { ID_TO_MENTION, WEBHOOK_URL } from './constants'

const succeeded = async () => {
  const message = {
    content: `<@${ID_TO_MENTION}> List Update Succeeded`,
    username: 'TWITTER_USER_COLLECTION',
  }

  await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  })
}

const failed = async () => {
  const message = {
    content: `<@${ID_TO_MENTION}> List Update Failed`,
    username: 'TWITTER_USER_COLLECTION',
  }

  await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  })
}

export const callback = {
  succeeded,
  failed,
}
