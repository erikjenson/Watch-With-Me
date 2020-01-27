import React from 'react'

class Publish extends React.Component {
  constructor() {
    super()

    this.handleConnect = this.handleConnect.bind(this)
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  handleConnect() {
    return 'connectPeers, false'
  }

  // disconnectPeers() {

  //   // Close the RTCDataChannels if they're open.

  //   sendChannel.close();
  //   receiveChannel.close();

  //   // Close the RTCPeerConnections

  //   localConnection.close();
  //   remoteConnection.close();

  //   sendChannel = null;
  //   receiveChannel = null;
  //   localConnection = null;
  //   remoteConnection = null;

  //   // Update user interface elements

  //   connectButton.disabled = false;
  //   disconnectButton.disabled = true;
  //   sendButton.disabled = true;

  //   messageInputBox.value = "";
  //   messageInputBox.disabled = true;
  // }
  handleDisconnect() {
    'disconnectPeers, false'
  }

  render() {
    function handleCreateDescriptionError() {
      console.log('Peer Connect Will Be Awesome! But Not Yet!')
    }
    function handleSendChannelStatusChange() {
      console.log('RTC channel was opened or closed!')
    }
    //much more complicated responses that set buttons to disabled or not can be added!
    function handleAddCandidateError() {
      console.log('Feeling cold about this ICE connection')
    }

    //sets up RTC peer connection for Provider
    const localConnection = new RTCPeerConnection()
    const sendChannel = localConnection.createDataChannel('sendChannel')
    sendChannel.onopen = handleSendChannelStatusChange
    //these change handlers will be called at any local open or close event.

    sendChannel.onclose = handleSendChannelStatusChange

    //sets up RTC peer connection for Subscriber
    const remoteConnection = new RTCPeerConnection()
    remoteConnection.ondatachannel = receiveChannelCallback

    //sets up ICE candidate listeners (handles connection changes)
    localConnection.onicecandidate = event =>
      !event.candidate ||
      remoteConnection
        .addIceCandidate(event.candidate)
        .catch(handleAddCandidateError)

    remoteConnection.onicecandidate = event =>
      !event.candidate ||
      localConnection
        .addIceCandidate(event.candidate)
        .catch(handleAddCandidateError)

    //create connection offer though our ICE listeneers
    localConnection
      .createOffer() //sets Session Description Protocol -can accept an object with constrainst for audio,video or both. If sucessful, it is passed to the method of our local RTC connection below
      .then(offer => localConnection.setLocalDescription(offer))
      //here we tell the remote peer about this -in real life the remote would require a server to exchange the description object
      .then(() =>
        remoteConnection.setRemoteDescription(localConnection.localDescription)
      )
      //for the remote to reply with a blob that describes the connection the remote can make
      .then(() => remoteConnection.createAnswer())
      //now the connection is established on the remote end (localDescription to her)
      .then(answer => remoteConnection.setLocalDescription(answer))
      //finally the local connection's remote description is set to refer to the remote peer
      .then(() =>
        localConnection.setRemoteDescription(remoteConnection.localDescription)
      )
      .catch(handleCreateDescriptionError)
    //in the real world a 'channeling server' is used to exchange the description which is in 'application/sdp' form

    //create handlers to disable changes..

    //once the connection is open the datachannel event is sent to the remote.  this invokes the callback method! and gves us methods to manage the connection.  handleRecieveMessage will be called each time the data is recieved by the remote peer. likewise with the other methods
    function receiveChannelCallback(event) {
      //recieveChannel is a saved instance of the remote connection.
      const receiveChannel = event.channel
      receiveChannel.onmessage = handleReceiveMessage
      receiveChannel.onopen = handleReceiveChannelStatusChange
      receiveChannel.onclose = handleReceiveChannelStatusChange
    }

    return (
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
    )
  }
}
export default Publish
