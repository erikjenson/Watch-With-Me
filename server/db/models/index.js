const User = require('./user')
const Message = require('./message')
const Channel = require('./channel')

//attempt to self-many-to-many to make 'friends'
// who are also users

// User.belongsToMany(User, {
//   through: Channel,
//   as: 'User',
//   foreignKey: 'userId'
// })
// User.belongsToMany(User, {
//   through: Channel,
//   as: 'Friend',
//   foreignKey: 'friendId'
// })

Channel.hasMany(Message, {
  onDelete: 'cascade',
  hooks: true
})
Message.belongsTo(User)

User.hasMany(Message)
Message.belongsTo(Channel)

module.exports = {
  User,
  Message,
  Channel
}
