import React from 'react'
import {getStream} from '../store/channel'

class Subscribe extends React.Component {
  constructor() {
    super()

    this.handleConnect = this.handleConnect.bind(this)
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }
  componentDidMount() {
    this.props.getStream()
  }

  handleConnect() {}
  handleDisconnect() {}

  render() {
    return (
      <div>
        <video src={this.props.stream} />
        <div>
          <button
            type="button"
            id="connectButton"
            name="connectButton"
            className="buttonleft"
            onClick={this.handleConnect}
          >
            Connect
          </button>
          <button
            type="button"
            id="disconnectButton"
            name="disconnectButton"
            className="buttonright"
            onClick={this.handleDisconnect}
            disabled
          >
            Disconnect
          </button>
        </div>
      </div>
    )
  }
}

const maptStateToProps = state => {
  return {stream: state.channel.stream}
}
const mapDispatchToProps = dispatch => {
  return {getStream: () => dispatch(getStream())}
}

export default (maptStateToProps, mapDispatchToProps)(Subscribe)
