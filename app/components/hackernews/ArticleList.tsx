import React from "react"
import UserMetaInfo from './UserMetaInfo'
import { Post } from "../../utils/api.hackernews"
import PropTypes from 'prop-types'

export default function Articles({ posts }: { posts: Post[]}) {
  return (
    <ul className="hackernews-list">
      {posts.map((post, index) => {
        const { id, by, descendants, url, title, time } = post

        return (
          <li key={index} className="hackernews-list__item">
            <a href={url} target="_blank" className="article-link">{title}</a><br />
            <UserMetaInfo id={id} by={by} descendants={descendants} time={time} showComments={true} />
          </li>
        )
      })}
    </ul>
  )
}

Articles.propTypes = {
  posts: PropTypes.array.isRequired
}