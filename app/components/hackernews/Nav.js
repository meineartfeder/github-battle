import React from "react";
import { ThemeConsumer } from "../../contexts/theme";
import { NavLink } from "react-router-dom";

const activeStyle = {
  color: 'rgb(187, 46, 31)'
}

export default function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className="row space-around">
          <ul className="row nav">
            <li>
              <NavLink
                to='/hackernews/top'
                activeStyle={activeStyle}
                className="nav-link">
                Top
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/hackernews/new'
                activeStyle={activeStyle}
                className="nav-link">
                New
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </ThemeConsumer>
  )
}