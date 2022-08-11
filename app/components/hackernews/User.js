import React from "react"
import Nav from "./Nav"
import { fetchUser } from "../../utils/api.hackernews"
import queryString from "query-string"
import Loading from "../Loading"
import UserDetails from "./UserDetails"
import UserPosts from "./UserPosts"

export default class User extends React.Component {
  state = {
    loading: true,
    error: false,
    user: []
  }
  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search)

    fetchUser(id)
      .then((user) => {
        this.setState({
          user: user,
          loading: false
        })
      })
      .catch(() => {
        console.warn('Error fetching user: ', error)

        this.setState({
          loading: false,
          error: 'There was an error fetching the user.'
        })
      })
  }
  render() {
    const { loading, user, error } = this.state

    if (error) {
      return (
        <p className="center-text error">{error}</p>
      )
    }

    return (
      <React.Fragment>
        <Nav />
        {loading === true
          ? <Loading text="Loading User" />
          : <React.Fragment>
              <UserDetails user={user} />
              <UserPosts posts={user.submitted} />
            </React.Fragment>
        }
      </React.Fragment>
    )
  }
}