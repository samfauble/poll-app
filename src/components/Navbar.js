import React from 'react'
import {NavLink} from "react-router-dom"

function Navbar() {
    return (
        <nav className="nav">
            <ul>
                <li>
                    <NavLink 
                        to="/"
                        activeStyle={{fontWeight: "bold"}}>
                            Home
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/leaderboard"
                        activeStyle={{fontWeight: "bold"}}>
                            Leaderboard
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/add"
                        activeStyle={{fontWeight: "bold"}}>
                            Add Post
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
