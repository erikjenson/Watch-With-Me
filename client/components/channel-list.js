import React from 'react'
import {connect} from 'react-redux'
import {getChannels, setChannelId} from '../store/channel'
import {getMessagesFromServer} from '../store/message'
import history from '../history'

class ChannelList extends React.Component {
  constructor() {
    super()

    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getChannels()
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.setChannelId(this.state.value)
    this.props.getMessagesFromServer(this.state.value)
    history.push('/messages')
  }
  handleChange(event) {
    this.setState({value: event.target.value})
  }

  render() {
    const {channels} = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <label className="pickChannel">
          Ask someone to watch with you:
          <select value={this.state.value} onChange={this.handleChange}>
            {channels.map(channel => (
              <option key={channel.id} value={channel.id}>
                {channel.channelName}
              </option>
            ))}
          </select>
          <input type="submit" value="Submit" />
        </label>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {channels: state.channel.all, user: state.user.one}
}

const mapDispatchToProps = dispatch => {
  return {
    getChannels: () => dispatch(getChannels()),
    getMessagesFromServer: channelId =>
      dispatch(getMessagesFromServer(channelId)),
    setChannelId: id => dispatch(setChannelId(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList)
