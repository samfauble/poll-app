import React, { Component } from 'react'
import {connect} from "react-redux"
import {NavLink} from "react-router-dom"


export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isAnswered: false
        }
    }
    
    handleClick = (isAnswered) => {
        this.setState({
            isAnswered: isAnswered
        })
    }

    render() {
        const {isAnswered} = this.state
        const {answered, unanswered} = this.props
        const list = isAnswered===true ? answered : unanswered

        return (
            <div>
                <div className="dashboard-toggle">
                    <button 
                        onClick={()=> this.handleClick(true)}
                        style={{textDecoration: isAnswered ? "underline" : null}}>
                            Answered
                    </button> 
                    <span> | </span>
                    <button 
                        onClick={()=> this.handleClick(false)}
                        style={{textDecoration: isAnswered ? null : "underline"}}>
                            Unanswered
                    </button> 
                </div> 
                <ul className="dashboard-list">
                    {list.map((poll)=>{
                        //Don't forget return! 
                        return(
                            <li key={poll.id}>
                                <NavLink to={`/poll/${poll.id}`}>
                                    {poll.question}
                                </NavLink>
                            </li>
                        )})}
                </ul>
                 
            </div>
        )
    }
}





function mapStateToProps ({pollsReducer, authedUserReducer, userReducer}) {
    //answers of authedUser
    const answers = userReducer[authedUserReducer].answers

    //array of answered questions
    //if a poll id from answers matches that of a poll from polls, add that poll to the list
    const answered = answers.map((id)=>pollsReducer[id])
    //sort answers based on chronological order
    .sort((a,b)=>b.timestamp-a.timestamp)

    //Object.keys returns all polls
    const unanswered = Object.keys(pollsReducer)
    //filter out polls w/ ids that are included in answers
    .filter((id)=> !answers.includes(id))
    //map over remaining ids onto unanswered array
    .map((id)=> pollsReducer[id])
    .sort((a,b)=>b.timestamp-a.timestamp)

    return {
        answered, unanswered
    }
}

export default connect(mapStateToProps)(Home)
