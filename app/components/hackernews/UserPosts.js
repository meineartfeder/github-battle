import React from "react"
import { fetchPosts } from "../../utils/api.hackernews"
import Loading from "../Loading"
import ArticleList from "./ArticleList"
import PropTypes from "prop-types";

function postsReducer(state, action) {
  if (action.type === 'success') {
    return {
      posts: action.posts,
      error: null,
      loading: false
    }
  } else if (action.type === 'loading') {
    return {
      posts: null,
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
export default function UserPosts({ userPosts }) {
  const [state, dispatch] = React.useReducer(postsReducer, {
    posts: null,
    error: null,
    loading: true,
  })
  const only30FirstPosts = userPosts.slice(0, 30);

  React.useEffect(() => {
    dispatch({ type: 'loading' })

    fetchPosts(only30FirstPosts)
      .then((posts) => dispatch({ type: 'success', posts: posts }))
      .catch((message) => dispatch({ type: 'error', error: message }))
  }, [userPosts])

  const { loading, posts, error } = state

  if (loading === true) {
    return <Loading text="Fetching Posts" />
  }

  if (error) {
    return (
      <p className="center-text error">{error}</p>
    )
  }

  if (posts.length === 0) {
    return <p className="center-text">This user hasn't posted yet.</p>
  }

  return (
    <React.Fragment>
      <h2>Posts</h2>
      <ArticleList posts={posts} />
    </React.Fragment>
  )
}

UserPosts.propTypes = {
  userPosts: PropTypes.array.isRequired
}