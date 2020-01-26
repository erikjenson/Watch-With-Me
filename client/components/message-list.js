import React from 'react'
import {connect} from 'react-redux'
import {getMessagesFromServer} from '../store/message'
import Message from './message'
import {Link} from 'react-router-dom'

import NewMessageEntry from './message-new'

class MessagesList extends React.Component {
  //this can be a functional component!

  render() {
    const {messages, user, channelId} = this.props

    return (
      <div className="messageList">
        <ul className="messageBody">
          {messages.map((message, idx) => (
            <Message key={idx} message={message} user={user} />
          ))}
        </ul>
        <NewMessageEntry channelId={channelId} />
        <div>{/* <Link to="/share-screen">Share Screen</Link> */}</div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    messages: state.message.all,
    channelId: state.channel.channelId,
    user: state.user.one
  }
}
const mapDispatchToProps = dispatch => {
  return {getMessagesFromServer: id => dispatch(getMessagesFromServer(id))}
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList)
