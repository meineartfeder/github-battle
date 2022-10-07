import React from "react";
import { NavLink } from "react-router-dom";

const activeStyle = {
  color: 'rgb(187, 46, 31)'
}

export default function Nav() {
  return (
    <nav className="row space-around">
      <ul className="row nav">
        <li>
          <NavLink
            to='/hackernews'
            activeStyle={activeStyle}
            className="nav-link" exact>
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
  )
}