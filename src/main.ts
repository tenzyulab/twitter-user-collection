import { ETwitterStreamEvent } from 'twitter-api-v2'

import { LIST_ID_1, RULE_1 } from './constants'
import { v1Client, v2Client } from './clients'
import { callback } from './callback'

// --------------------------------------------------

// Configure the streaming
// --------------------------------------------------
const rules = await v2Client.streamRules()
if (rules.data?.length) {
  await v2Client.updateStreamRules({
    delete: { ids: rules.data.map((rule) => rule.id) },
  })
}

await v2Client.updateStreamRules(RULE_1)

const stream = await v2Client.searchStream({
  'tweet.fields': ['author_id', 'text'],
})
stream.autoReconnect = true

// --------------------------------------------------

// Manage the cache
// --------------------------------------------------
let isReady = false
const cacheMemberIds = new Set<string>()
const _import = async () => {
  const listMembers = await v2Client.listMembers(LIST_ID_1, {
    'user.fields': ['id'],
  })
  console.log(listMembers.data.errors?.length)
  console.log(listMembers.done)

  for (const member of listMembers) {
    console.log('for', member)
    cacheMemberIds.add(member.id)
    console.log('imported', member.id)
  }
  while (!listMembers.done) {
    console.log('while')
    await listMembers.fetchNext()
  }

  isReady = true
}
await _import()

// --------------------------------------------------

// Add members to the list
// --------------------------------------------------
let bulk: string[] = []

// counter for the asyncronous
const count = (() => {
  let num = 0

  return () => {
    return ++num
  }
})()

stream.on(ETwitterStreamEvent.Data, async (tweet) => {
  if (!isReady) return

  const userId = tweet.data.author_id

  if (!userId) return
  if (cacheMemberIds.has(userId)) return

  console.log(`[RUNNING] Fetched tweet: ${tweet.data.text.replace('\n', '')}`)
  bulk.push(userId)
  cacheMemberIds.add(userId)

  if (count() % 10 !== 0) return

  const date = new Date().toLocaleString('ja-JP')
  await v1Client
    .addListMembers({
      list_id: LIST_ID_1,
      user_id: bulk,
    })
    .then(() => {
      console.log(`[Succeeded] Added ${bulk.join(`, `)} ${date}`)
      bulk = []
      void callback.succeeded()
    })
    .catch(() => {
      console.log(`[Failed] Ignored ${bulk.join(`, `)} ${date}`)
      bulk = []
      void callback.failed()
    })
})
