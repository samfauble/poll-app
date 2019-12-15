import React, { Component } from 'react'
import {connect} from "react-redux"

export class Leaderboard extends Component {
    render() {
       const {users} = this.props
       console.log(users)
        return (
            <React.Fragment>
            <ul>
                {users.map((user)=>{
                    return(
                    <li className="user" key={user.avatarURL}>
                        <img src={user.avatarURL} alt={`Profile for ${user.name}`} />
                        <div>
                        <h2>{user.name}</h2>
                            <p>Answers: {user.answers}</p>
                            <p>Polls: {user.polls}</p>
                        </div>
                    </li>
                    )
                })}
            </ul>
            </React.Fragment>
        )
    }
}


//Use mapStateToProps to properly format the data so it can be used in the UI
function mapStateToProps ({userReducer}) {
    return {
        //Object.keys gives us access to all users in array
        users: Object.keys(userReducer)
        //map over all users, found by ID
        .map((id)=> {
            const {name, avatarURL, polls, answers} = userReducer[id]

            return {
                name, 
                avatarURL, 
                polls: polls.length,
                answers: answers.length
            }
        })
    }
}


export default connect(mapStateToProps)(Leaderboard)
