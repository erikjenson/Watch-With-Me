const router = require('express').Router()
const {User, Message} = require('../db/models')
module.exports = router

//get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//get a single user with messages
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'email'],
      include: [{model: Message}]
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

//create a single user
router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password
    })
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})
