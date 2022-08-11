import React from "react"
import Nav from "./Nav"
import MainPosts from "./MainPosts"


export default function NewArticles() {
  return (
    <React.Fragment>
      <Nav />
      <MainPosts type="new" />
    </React.Fragment>
  )
}