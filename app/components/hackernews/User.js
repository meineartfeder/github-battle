import React from "react"
import Nav from "./Nav"
import { fetchUser } from "../../utils/api.hackernews"
import queryString from "query-string"
import Loading from "../Loading"
import UserDetails from "./UserDetails"
import UserPosts from "./UserPosts"

function userReducer(state, action) {
  if (action.type === 'success') {
    return {
      user: action.user,
      error: null,
      loading: false
    }
  } else if (action.type === 'loading') {
    return {
      user: null,
      error: null,
      loading: true
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.message,
      loading: false
    }
  } else {
    throw new Error(`That action type isn't supported.`)
  }
}

export default function User ({ location }) {
  const [state, dispatch] = React.useReducer(userReducer, {
    user: null,
    error: null,
    loading: true,
  })
  const { id } = queryString.parse(location.search)

  React.useEffect(() => {
    dispatch({ type: 'loading' })

    fetchUser(id)
      .then((user) => dispatch({ type: 'success', user: user }))
      .catch((message) => dispatch({ type: 'error', error: message }))
  }, [id])

  const { loading, user, error } = state

  if (error) {
    return (
      <p className="center-text error">{error}</p>
    )
  }

  return (
    <React.Fragment>
      <Nav />
      {loading === true
        ? <Loading text="Loading User" />
        : <React.Fragment>
          <UserDetails user={user} />
          <UserPosts userPosts={user.submitted} />
        </React.Fragment>
      }
    </React.Fragment>
  )
}