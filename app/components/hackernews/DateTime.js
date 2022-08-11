import React from 'react'
import PropTypes from 'prop-types'

export default function DateTime({ timestamp }) {
  let milliseconds = new Date(timestamp*1000)
  let date = milliseconds.toLocaleDateString('de-DE')
  let time = milliseconds.toLocaleTimeString('de-DE')

  return (
    <React.Fragment>
      on {date}, {time}
    </React.Fragment>
  )
}

DateTime.propTypes = {
  timestamp: PropTypes.number.isRequired
}