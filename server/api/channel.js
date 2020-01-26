const router = require('express').Router()
const {Channel, Message} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const channels = await Channel.findAll()
    res.json(channels)
  } catch (err) {
    next(err)
  }
})

router.get('/:channelId', async (req, res, next) => {
  try {
    const channel = await Channel.findOne({
      where: {id: req.params.channelId}
    })
    res.json(channel)
  } catch (err) {
    next(err)
  }
})

//gets all messages with channel Id
// router.get('/:channelId', async (req, res, next) => {
//   try {
//     const channelId = req.params.channelId
//     const messages = await Message.findAll({where: {channelId}})
//     res.json(messages)
//   } catch (err) {
//     next(err)
//   }
// })

router.post('/', async (req, res, next) => {
  try {
    const channel = await Channel.create(req.body)
    res.json(channel)
  } catch (err) {
    next(err)
  }
})

router.delete('/:channelId', async (req, res, next) => {
  try {
    const id = req.params.channelId
    await Channel.destroy({where: {id}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
