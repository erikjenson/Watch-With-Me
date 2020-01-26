'use strict'

const db = require('../server/db')
const {User, Message, Channel} = require('../server/db/models')

const users = [
  {email: 'bigJ@K.com', password: '1'},
  {email: 'bigE@J.com', password: '1'},
  {email: 'littleE@J.com', password: '1'},
  {email: 'smallerE@J.com', password: '1'}
]
const channels = [{channelName: `Janienne-Erik`}, {channelName: 'Ella-Evie'}]

const messages = [
  {text: 'Hi Erik!', channelId: 1, userId: 1},
  {text: 'Hi Janienne!', channelId: 1, userId: 2},
  {text: 'Can you send me the link?', channelId: 1, userId: 2},
  {
    text: `Hi! Evie,It's Ella, wanna watch Little Mermaid?`,
    channelId: 2,
    userId: 3
  },
  {text: 'Hell Yeah!!!', channelId: 2, userId: 4}
]

async function seed() {
  await db.sync({force: true})
  await User.bulkCreate(users)
  await Channel.bulkCreate(channels)
  await Message.bulkCreate(messages)
  console.log('db synced!')

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
