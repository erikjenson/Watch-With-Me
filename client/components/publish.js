import React from 'react'

class Publish extends React.Component {
  render() {
    return (
      <div>
        <button
          type="button"
          id="connectButton"
          name="connectButton"
          className="buttonleft"
        >
          Connect
        </button>
        <button
          type="button"
          id="disconnectButton"
          name="disconnectButton"
          className="buttonright"
          disabled
        >
          Disconnect
        </button>
      </div>
    )
  }
}
export default Publish
