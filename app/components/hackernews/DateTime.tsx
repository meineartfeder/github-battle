import React from 'react'
import PropTypes from 'prop-types'

export default function DateTime({ timestamp }: { timestamp: number }) {
  let milliseconds = new Date(timestamp*1000)
  let date = milliseconds.toLocaleDateString('de-DE')
  let time = milliseconds.toLocaleTimeString('de-DE')

  return (
    <>
      on {date}, {time}
    </>
  )
}

DateTime.propTypes = {
  timestamp: PropTypes.number.isRequired
}