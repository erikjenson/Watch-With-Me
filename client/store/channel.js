import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CHANNEL = 'GOT_CHANNEL'
const GOT_CHANNELS = 'GOT_CHANNELS'
const SET_CHANNEL_ID = 'SET_CHANNEL_ID'

/**
 * INITIAL STATE
 */
const defaultChannel = {one: {}, all: [], channelId: '', channelName: ''}

/**
 * ACTION CREATORS
 */

const gotChannel = channel => ({type: GOT_CHANNEL, channel})
const gotChannels = channels => ({type: GOT_CHANNELS, channels})
export const setChannelId = id => ({type: SET_CHANNEL_ID, id})

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
    default:
      return state
  }
}
