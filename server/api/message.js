const router = require('express').Router()
const {Message, User} = require('../db/models')

module.exports = router

// get all messages
router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.findAll()
    res.json(messages)
  } catch (err) {
    next(err)
  }
})

//get messages by channel with users
router.get('/:channelId', async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      where: {channelId: +req.params.channelId},
      include: [{model: User, attributes: ['id', 'email']}]
    })
    res.json(messages)
  } catch (err) {
    next(err)
  }
})

//post new message and return attached user
router.post('/', async (req, res, next) => {
  try {
    const message = await Message.create(req.body)

    const user = await User.findOne({
      where: {id: req.body.userId},
      attributes: ['id', 'email']
    })

    const returnMessage = message.toJSON()
    returnMessage.user = user

    res.json(returnMessage)
  } catch (err) {
    next(err)
  }
})

// delete message
router.delete('/:messageId', async (req, res, next) => {
  try {
    const id = req.params.messageId
    await Message.destroy({where: {id}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
