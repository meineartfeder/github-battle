import React from "react"
import { User } from "../../utils/api.hackernews"
import DateTime from "./DateTime"
import PropTypes from "prop-types"

export default function UserDetails ({ user }: {user: User}) {
    return (
      <React.Fragment>
        <h1 className="header">
          {user.id}
        </h1>
        <div className="meta-info-light">joined <strong><DateTime timestamp={user.created} /></strong>, has <strong>{user.karma}</strong> karma</div>
        <p dangerouslySetInnerHTML={{ __html: user.about }} />
      </React.Fragment>
    )
}

UserDetails.propTypes = {
  user: PropTypes.object.isRequired
}