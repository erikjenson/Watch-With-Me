import io from 'socket.io-client'
import {gotNewMessageFromServer} from './store/message'
import store from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})
socket.on('new-message', message => {
  console.log('message being dispatched from socket', message)
  store.dispatch(gotNewMessageFromServer(message))
})

export default socket
