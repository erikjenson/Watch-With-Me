const Sequelize = require('sequelize')
const db = require('../db')
const User = require('../models')

const Message = db.define('message', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Message
