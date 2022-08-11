import React from "react"
import Nav from "./Nav"
import MainPosts from "./MainPosts"

export default function TopArticles () {
  return(
    <React.Fragment>
      <Nav />
      <MainPosts type="top" />
    </React.Fragment>
  )
}