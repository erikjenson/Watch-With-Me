import React from 'react'

export default function Message(props) {
  const {message} = props
  return (
    <li>
      <div className="message-single">
        <div className="messageName">{message.user.email}</div>
        {message.text}
      </div>
    </li>
  )
}
