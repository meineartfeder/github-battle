import React from "react"
import { fetchItem } from "../../utils/api.hackernews"
import queryString from "query-string"
import Nav from "./Nav"
import Loading from "../Loading"
import PostComments from "./PostComments"
import PostDetails from "./PostDetails"

function postReducer(state, action) {
  if (action.type === 'success') {
    return {
      post: action.post,
      error: null,
      loading: false
    }
  } else if (action.type === 'loading') {
    return {
      post: null,
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

export default function Post({ location }) {
  const [state, dispatch] = React.useReducer(postReducer, {
    post: null,
    error: null,
    loading: true,
  })
  const { id } = queryString.parse(location.search)

  React.useEffect(() => {
    dispatch({ type: 'loading' })

    fetchItem(id)
      .then((post) => dispatch({ type: 'success', post: post }))
      .catch((message) => dispatch({ type: 'error', error: message }))
  }, [id])

  const { loading, post, error } = state

  if (loading === true) {
    return <Loading />
  }

  if (error) {
    return (
      <p className="center-text error">{error}</p>
    )
  }

  return (
    <React.Fragment>
      <Nav />
      <PostDetails post={post} loading={loading} />
      {post.descendants > 0 ? <PostComments comments={post.kids} /> : <p className="center-text">No comments posted yet.</p>}
    </React.Fragment>
  )
}