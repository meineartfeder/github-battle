import React from "react"
import { fetchItem, Post } from "../../utils/api.hackernews"
import queryString from "query-string"
import Nav from "./Nav"
import Loading from "../Loading"
import PostComments from "./PostComments"
import PostDetails from "./PostDetails"

type PostActions = {
  type: "success",
  post: Post,
} | {
  type: "loading",
  loading: boolean
} | {
  type: "error",
  error: string
}

interface PostState {
  post: null | Post;
  loading: boolean;
  error: null | string;
}

function postReducer(state: PostState, action: PostActions) {
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
      error: action.error,
      loading: false
    }
  } else {
    throw new Error(`That action type isn't supported.`)
  }
}

export default function PostComponent({ location }: { location: { search: string } }) {
  const [state, dispatch] = React.useReducer(postReducer, {
    post: null,
    error: null,
    loading: true,
  })
  const { id } = queryString.parse(location.search) as { id: string };

  React.useEffect(() => {
    dispatch({ type: 'loading', loading: true })

    fetchItem(id)
      .then((post) => dispatch({ type: 'success', post: post }))
      .catch((error) => dispatch({ type: 'error', error: error }))

  }, [id])

  const { loading, post, error } = state

  if (loading === true) {
    return <Loading />
  }

  if (error || !post || !post.descendants) {
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