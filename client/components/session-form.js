import React from 'react'
import {connect} from 'react-redux'

const SessionForm = () => {
  return <div></div>
}

const mapState = state => {
  return {newSessionId: state.SessionId}
}
const mapDispatch = dispatch => {
  return {
    handleChange() {},
    handleSubmit() {
      dispatch(sendConnectionRequest(key))
    }
  }
}

export default connect(mapState, mapDispatch)(SessionForm)
