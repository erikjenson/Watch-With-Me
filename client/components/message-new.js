import React from 'react'
import {writeMessage, postNewMessage} from '../store/message'
import {connect} from 'react-redux'

class NewMessage extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.props.write(evt.target.value)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const {channelId, userId, text} = this.props
    this.props.post({userId, text, channelId})
    this.props.write('')
  }

  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="messge-input">
          <input
            className="form-control"
            type="text"
            // name="content"
            value={this.props.text}
            onChange={this.handleChange}
            placeholder="Write something here!"
          />
          <span className="messge-input-btn">
            <button type="submit">Send!</button>
          </span>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {text: state.message.newEntry, userId: state.user.one.id}
}
const mapDispatchToProps = dispatch => {
  return {
    write: input => dispatch(writeMessage(input)),

    post: message => dispatch(postNewMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage)
