import io from 'socket.io-client'
import {gotNewMessageFromServer} from './store/message'
import {gotStream} from './store/channel'
import store from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})
socket.on('new-message', message => {
  console.log('message being dispatched from socket', message)
  store.dispatch(gotNewMessageFromServer(message))
})

socket.on('new-stream', stream => {
  console.log('stream being dispatched from socket', stream)
  store.dispatch(gotStream(stream))
})

export default socket
