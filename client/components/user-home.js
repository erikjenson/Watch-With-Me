import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ChannelList from './channel-list'
import {SessionForm} from './session-form'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="userHome">
      <h3>Welcome, {email}</h3>
      <ChannelList />
      <h4>OR</h4>
      <h4>Put your friend's secret code here:</h4>
      {/* <SessionForm /> */}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.one.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
