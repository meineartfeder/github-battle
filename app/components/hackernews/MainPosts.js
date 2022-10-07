import React from "react"
import { fetchMainPosts } from "../../utils/api.hackernews"
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
export default function MainPosts ({ type }) {
  const [state, dispatch] = React.useReducer(postsReducer, {
    posts: null,
    error: null,
    loading: true,
  })

  React.useEffect(() => {
    dispatch({ type: 'loading' })

    fetchMainPosts(type)
      .then((posts) => dispatch({ type: 'success', posts: posts }))
      .catch((message) => dispatch({ type: 'error', error: message }))
  }, [type])

  const { loading, posts, error } = state

  if (loading === true) {
    return <Loading />
  }

  if (error) {
    return (
      <p className="center-text error">{error}</p>
    )
  }

  return (
    <ArticleList posts={posts} />
  )
}

// export default class MainPosts extends React.Component {
//   state = {
//     loading: true,
//     error: false,
//     posts: []
//   }
//   componentDidMount () {
//     fetchMainPosts(this.props.type)
//       .then((posts) => {
//         this.setState({
//           posts: posts,
//           loading: false
//         })
//       })
//       .catch(() => {
//         console.warn('Error fetching posts: ', error)

//         this.setState({
//           loading: false,
//           error: 'There was an error fetching the posts.'
//         })
//       })
//   }
//   render() {
//     const { loading, posts, error } = this.state

//     if (loading === true) {
//       return <Loading />
//     }

//     if (error) {
//       return (
//         <p className="center-text error">{error}</p>
//       )
//     }

//     return (
//       <ArticleList posts={posts} />
//     )
//   }
// }

MainPosts.propTypes = {
  type: PropTypes.oneOf(['top', 'new'])
}