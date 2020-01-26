const router = require('express').Router()
const {User, Channel} = require('../db/models')
module.exports = router

//gets a list of friends (other users) connected through the channel model
router.get('/', async (req, res, next) => {
  try {
    const friends = await User.findAll({
      include: [{model: Channel}]
    })
    res.json(friends)
  } catch (err) {
    next(err)
  }
})

//gets a single friend channel
router.get('/:id', async (req, res, next) => {
  try {
    const friend = await User.findOne({
      where: {id: req.params.id},
      attributes: ['id', 'email', 'name'],
      include: [{model: Channel, where: {friendId: req.params.id}}]
    })
    res.json(friend)
  } catch (error) {
    next(error)
  }
})

//creates a friend channel (set up by admin /parent)
// router.post('/', async (req, res, next) => {
//   try {
//     const newFriend = await User.create({
//       email: req.body.email,
//       password: req.body.password,
//       name: req.body.name
//     })
//     res.status(201).json(newFriend)
//   } catch (error) {
//     next(error)
//   }
// })
