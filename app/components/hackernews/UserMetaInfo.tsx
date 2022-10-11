import React from "react"
import { User } from "../../utils/api.hackernews"
import { Link } from "react-router-dom"
import DateTime from "./DateTime"
import PropTypes from "prop-types"

function Comments ({ id, descendants }: {
  id: string,
  descendants: number
}) {
  return (
    <React.Fragment>
      <span> with <Link to={{ pathname: '/hackernews/post', search: `?id=${id}` }}>{descendants} comments</Link></span>
    </React.Fragment>
  )
}

Comments.propTypes = {
  id: PropTypes.string.isRequired,
  descendants: PropTypes.number
}

Comments.defaultProps = {
  descendants: 0
}

export default function UserMetaInfo({ id, by, descendants = 0, time, showComments = false }: {
  id: string,
  by: string,
  descendants?: number,
  time: number,
  showComments?: boolean
}) {
  return (
    <div className="meta-info-light">
      by <Link to={{ pathname: '/hackernews/user', search: `?id=${by}` }}>{by}</Link> <DateTime timestamp={time} /> 
      {showComments ? <Comments id={id} descendants={descendants} /> : null}
    </div>
  )
}

UserMetaInfo.propTypes = {
  id: PropTypes.string.isRequired,
  by: PropTypes.string.isRequired,
  descendants: PropTypes.number,
  time: PropTypes.number.isRequired,
  showComments: PropTypes.bool
}

UserMetaInfo.defaultProps = {
  descendants: 0,
  showComments: false
}