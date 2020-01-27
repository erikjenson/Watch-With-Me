import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CHANNEL = 'GOT_CHANNEL'
const GOT_CHANNELS = 'GOT_CHANNELS'
const SET_CHANNEL_ID = 'SET_CHANNEL_ID'
const GOT_STREAM = 'GOT_STREAM'
const GET_STREAM = 'GET_STREAM'

/**
 * INITIAL STATE
 */
const defaultChannel = {one: {}, all: [], channelId: '', channelName: ''}

/**
 * ACTION CREATORS
 */

export const gotChannel = channel => ({type: GOT_CHANNEL, channel})
export const gotChannels = channels => ({type: GOT_CHANNELS, channels})
export const setChannelId = id => ({type: SET_CHANNEL_ID, id})
export const gotStream = stream => ({type: GOT_STREAM, stream})
export const getStream = () => ({type: GET_STREAM})

/**
 * THUNK CREATORS
 */
export const getChannels = () => async dispatch => {
  try {
    const {data} = await axios.get(`api/channel`)
    dispatch(gotChannels(data))
  } catch (err) {
    console.error(err)
  }
}

//sens captureStream to peer connected on socket. find way to set audio to window source.
export const startCapture = displayMediaOptions => async dispatch => {
  try {
    const captureStream = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    )
    dispatch(gotStream(captureStream))
  } catch (err) {
    console.error('Error: ' + err)
  }
}

export const getChannel = id => async dispatch => {
  try {
    const {data} = await axios.get(`api/channel/${id}`)
    dispatch(gotChannel(data))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultChannel, action) {
  switch (action.type) {
    case GOT_CHANNEL:
      return {...state, one: action.channel}
    case GOT_CHANNELS:
      return {...state, all: action.channels}
    case SET_CHANNEL_ID:
      return {...state, channelId: action.id}
    case GOT_STREAM:
      return {...state, stream: action.stream}
    case GET_STREAM:
      return {...state}
    default:
      return state
  }
}
