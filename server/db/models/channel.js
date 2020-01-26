const Sequelize = require('sequelize')
const db = require('../db')

const Channel = db.define('channel', {
  channelName: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'userName/friendName'
  }
})

module.exports = Channel
