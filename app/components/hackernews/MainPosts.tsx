import React from "react"
import { fetchMainPosts, PostTypes, Post } from "../../utils/api.hackernews"
import Loading from "../Loading"
import ArticleList from "./ArticleList"
import PropTypes from "prop-types";

type PostsActions = {
  type: "success",
  posts: Post[],
} | {
  type: "loading",
  loading: boolean
} | {
  type: "error",
  error: string
}

interface PostsState {
  posts: null | Post[];
  loading: boolean;
  error: null | string;
}

function postsReducer(state: PostsState, action: PostsActions) {
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
      error: action.error,
      loading: false
    }
  } else {
    throw new Error(`That action type isn't supported.`)
  }
}
export default function MainPosts({ type }: { type: PostTypes }) {
  const [state, dispatch] = React.useReducer(postsReducer, {
    posts: null,
    error: null,
    loading: true,
  })

  React.useEffect(() => {
    dispatch({ type: 'loading', loading: true })

    fetchMainPosts(type)
      .then((posts) => dispatch({ type: 'success', posts: posts }))
      .catch((message) => dispatch({ type: 'error', error: message }))
  }, [type])

  const { loading, posts, error } = state

  if (loading === true) {
    return <Loading />
  }

  if (error || !posts) {
    return (
      <p className="center-text error">{error}</p>
    )
  }
  
  return (
    <ArticleList posts={posts} />
  )
}

MainPosts.propTypes = {
  type: PropTypes.oneOf(['top', 'new'])
}