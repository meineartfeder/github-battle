import React from "react"
import Nav from "./Nav"
import { fetchUser, User } from "../../utils/api.hackernews"
import queryString from "query-string"
import Loading from "../Loading"
import UserDetails from "./UserDetails"
import UserPosts from "./UserPosts"

type UserAction = {
  type: "success",
  user: User
} | {
  type: "loading",
  loading: boolean
} | {
  type: "error",
  error: string
}

interface UserState {
  user: null | User;
  loading: boolean;
  error: null | string;
}

function userReducer(state: UserState, action: UserAction) {
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
      error: action.error,
      loading: false
    }
  } else {
    throw new Error(`That action type isn't supported.`)
  }
}

export default function UserComponent ({ location }: {location: {search: string}}) {
  const [state, dispatch] = React.useReducer(userReducer, {
    user: null,
    error: null,
    loading: true,
  })
  const { id } = queryString.parse(location.search) as { id: string }

  React.useEffect(() => {
    dispatch({ type: 'loading', loading: true })

    fetchUser(id)
      .then((user) => dispatch({ type: 'success', user: user }))
      .catch((error) => dispatch({ type: 'error', error: error }))
  }, [id])

  const { loading, user, error } = state

  if (error || !user) {
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