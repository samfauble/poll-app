import React, { Component } from 'react'
import {connect} from "react-redux"
import {getPercentage} from "../utils/helpers"
import {handleAddAnswer} from "../actions/polls"

export class Poll extends Component {


    handleClick (answer) {
        const {poll, authedUserReducer, dispatch} = this.props
        this.answered = true
        dispatch(handleAddAnswer({
            answer: answer,
            authedUser: authedUserReducer,
            id: poll.id
        }))
        console.log("Add answer: ", answer)
    }
    

    render() {
        const { poll, votedFor, authorAvatar} = this.props
        const {aVotes, bVotes, cVotes, dVotes, author, question} = poll
        const textStringArray = ["aText", "bText", "cText", "dText"]

        if(poll === null) {
            return <p>This poll doesn't exist</p>
        }


        const votesToPercent = (votes) => {
            const voteSum = aVotes.length + bVotes.length + cVotes.length + dVotes.length 
            return `${getPercentage(votes, voteSum)}%`
        }

        return (
            <div className="poll-container">
                <h1 className="question">
                    {question}
                </h1>
                <div className="poll-author">
                    By <img src={authorAvatar} alt={`Avatar of ${author}`} height="50px" />
                </div>
                <ul>
                    {textStringArray.map((array)=>{
                        const optionVote = `${array[0]}Votes`
                        return(
                            <li 
                            key={array[0]}
                            className = {`option ${votedFor===array[0] ? "chosen" : ""}`}
                            onClick={() => {
                            votedFor === null & !this.answered &&
                            this.handleClick(array[0])
                            }}> 
                                {votedFor !== null ? 
                                <div className="result">
                                    <span>{poll[array]}</span>
                                    <span>
                                        {`${votesToPercent(poll[optionVote].length)}, 
                                        (${poll[optionVote].length})`}  
                                    </span>
                                </div>
                                : poll[array]
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

// mapStateToProps can take current props as second argument
function mapStateToProps ({pollsReducer, userReducer, authedUserReducer}, {match}) {
    // get the id of the poll that the user is currently viewing
    const {id}= match.params
    const poll = pollsReducer[id]
    const { author } = poll

    const votesArrayString = [`aVotes`, `bVotes`, `cVotes`, `dVotes`]

    //vote starts as null
    //if the item currently being reduced over (poll[key]) contains authedUserReducer, make vote = key
    //if vote !== null, return the first letter in the item string 
    const votedFor = votesArrayString.reduce((vote, key)=> {
        if(vote !== null) {
            return vote[0]
        }

        return poll[key].includes(authedUserReducer) ? key : vote
    }, null)


    //if poll doesn't exist, return poll as null
    if (!poll) {
        return {
            poll: null
        }
    }
    
    return {
        poll,
        authedUserReducer,
        votedFor,
        authorAvatar: userReducer[author].avatarURL    
    }
}

export default connect(mapStateToProps)(Poll)
