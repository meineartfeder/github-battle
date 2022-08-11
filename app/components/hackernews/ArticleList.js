import React from "react"
import UserMetaInfo from './UserMetaInfo'

export default function Articles({ posts }) {
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