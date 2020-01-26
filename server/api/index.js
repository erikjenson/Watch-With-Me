const router = require('express').Router()
module.exports = router

router.use('/user', require('./user'))
router.use('/message', require('./message'))
router.use('/channel', require('./channel'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
