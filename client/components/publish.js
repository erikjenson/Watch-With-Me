import React from 'react'
import {connect} from 'react-redux'
import {startCapture} from '../store'

class Publish extends React.Component {
  constructor() {
    super()

    this.handleConnect = this.handleConnect.bind(this)
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  handleConnect() {
    this.props.startCapture({video: true, audio: true})
  }
  handleDisconnect() {
    function stopCapture(evt) {
      video.setAttribute('srcObject', stream)

      // react won't let you access this object.
      let tracks = videoElem.srcObject.getTracks()

      tracks.forEach(track => track.stop())
      videoElem.srcObject = null
    }
  }

  render() {
    return (
      <div>
        <button
          type="button"
          id="connectButton"
          name="connectButton"
          className="buttonleft"
          onClick={this.handleConnect}
        >
          START
        </button>
        <button
          type="button"
          id="disconnectButton"
          name="disconnectButton"
          className="buttonright"
          onClick={this.handleDisconnect}
          disabled
        >
          STOP
        </button>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    startCapture: displayMediaOptions => {
      dispatch(startCapture(displayMediaOptions))
    }
  }
}

export default connect(null, mapDispatchToProps)(Publish)
