import axios from 'axios'
import socket from '../socket'

/**
 * ACTION TYPES
 */
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER'
const WRITE_MESSAGE = 'WRITE_MESSAGE'
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER'

/**
 * INITIAL STATE
 */
const defaultMessages = {all: [], newEntry: ''}

/**
 * ACTION CREATORS
 */
export const gotMessagesFromServer = messages => {
  return {type: GOT_MESSAGES_FROM_SERVER, messages}
}
export const gotNewMessageFromServer = message => {
  return {type: GOT_NEW_MESSAGE_FROM_SERVER, message}
}
export const writeMessage = input => {
  return {type: WRITE_MESSAGE, newEntry: input}
}

/**
 * THUNK CREATORS
 */

//returns messages for a specific channel
export const getMessagesFromServer = channelId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/message/${channelId}`)
    dispatch(gotMessagesFromServer(data))
  }
}

export const postNewMessage = message => {
  return async dispatch => {
    const {data} = await axios.post('/api/message', message)
    dispatch(gotNewMessageFromServer(data))
    console.log('data in thunk ready for socket emit', data)
    socket.emit('new-message', data)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultMessages, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return {...state, all: action.messages}
    case WRITE_MESSAGE:
      return {...state, newEntry: action.newEntry}
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return {...state, all: [...state.all, action.message]}
    default:
      return state
  }
}
