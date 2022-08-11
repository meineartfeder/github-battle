import React from "react"
import { fetchMainPosts } from "../../utils/api.hackernews"
import Loading from "../Loading"
import ArticleList from "./ArticleList"
import PropTypes from "prop-types";


export default class MainPosts extends React.Component {
  state = {
    loading: true,
    error: false,
    posts: []
  }
  componentDidMount () {
    fetchMainPosts(this.props.type)
      .then((posts) => {
        this.setState({
          posts: posts,
          loading: false
        })
      })
      .catch(() => {
        console.warn('Error fetching posts: ', error)

        this.setState({
          loading: false,
          error: 'There was an error fetching the posts.'
        })
      })
  }
  render() {
    const { loading, posts, error } = this.state

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
}

MainPosts.propTypes = {
  type: PropTypes.string.isRequired
}