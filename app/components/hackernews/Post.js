import React from "react"
import { fetchItem } from "../../utils/api.hackernews"
import queryString from "query-string"
import Nav from "./Nav"
import Loading from "../Loading"
import PostComments from "./PostComments"

import PostDetails from "./PostDetails"

export default class Post extends React.Component {
  state = {
    loading: true,
    error: false,
    post: {}
  }
  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search)

    fetchItem(id)
      .then((post) => {
        this.setState({
          post: post,
          loading: false
        })
      })
      .catch(() => {
        console.warn('Error fetching post: ', error)

        this.setState({
          loading: false,
          error: 'There was an error fetching the post.'
        })
      })
  }
  render() {
    const { loading, post, error } = this.state

    if(loading === true) {
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
        {post.descendants > 0 ? <PostComments comments={post.kids} /> : null}
      </React.Fragment>
    )
  }
}