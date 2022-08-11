import React from "react"
import { fetchPosts } from "../../utils/api.hackernews"
import Loading from "../Loading"
import ArticleList from "./ArticleList"
import PropTypes from "prop-types";

export default class UserPosts extends React.Component {
  state = {
    loading: true,
    error: false,
    posts: []
  }
  componentDidMount() {
    const only30FirstPosts = this.props.posts.slice(0, 30);

    fetchPosts(only30FirstPosts)
      .then((posts) => {
        this.setState({
          posts: posts,
          loading: false
        })
      })
  }
  render() {
    const { loading, posts, error } = this.state

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
}

UserPosts.propTypes = {
  posts: PropTypes.array.isRequired
}