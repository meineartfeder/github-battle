import React from "react"
import UserMetaInfo from "./UserMetaInfo"
import { Post } from "../../utils/api.hackernews"
import PropTypes from "prop-types"
import Loading from "../Loading"

export default function PostDetails ({ post, loading }: {
  post: Post,
  loading: boolean
}) {
    if (loading === true) {
      return <Loading />
    }

    return (
      <React.Fragment>
        <h1 className="header">
          <a href={post.url} target="_blank" className="link">
            {post.title}
          </a>
        </h1>
        <UserMetaInfo by={post.by} id={post.id} descendants={post.descendants} time={post.time} showComments={true} />
      </React.Fragment>
    )
}

PostDetails.propTypes = {
  post: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}