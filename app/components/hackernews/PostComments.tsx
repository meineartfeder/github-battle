import React from "react"
import PropTypes from "prop-types"
import { fetchComments, Post } from "../../utils/api.hackernews"
import Loading from "../Loading"
import UserMetaInfo from "./UserMetaInfo"

interface PostCommentsProps {
  comments: string[];
}

interface PostCommentsState {
  loading: boolean;
  comments: Post[];
}

export default class PostComments extends React.Component<PostCommentsProps, PostCommentsState> {
  state = {
    loading: true,
    comments: []
  }
  componentDidMount() {
    fetchComments(this.props.comments)
      .then((comments) => {
        this.setState({
          comments: comments,
          loading: false
        })
      })
  }
  render() {
    const { loading, comments } = this.state

    if (loading === true) {
      return <Loading />
    }

    if (comments.length === 0) {
      return <p>No comments yet.</p>
    }

    return (
      <div className="hackernews-comments">
        {comments.map((comment, index) => {
          const { by, id, text, time } = comment

          return (
            <div key={index} className="comment">
              <UserMetaInfo by={by} id={id} time={time} />
              <p dangerouslySetInnerHTML={{__html: text}} />
            </div>
          )
        })}
      </div>
    )
  }
}

PostComments.propTypes = {
  comments: PropTypes.array.isRequired
}