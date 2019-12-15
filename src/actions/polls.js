import {savePoll} from "../utils/api"
import {showLoading, hideLoading} from "react-redux-loading"
import {savePollAnswer} from "../utils/api"

export const RECIEVE_POLLS= "RECEIVE_POLLS"
export const ADD_POLL= "ADD_POLL"
export const ADD_ANSWER= "ADD_ANSWER"


export function getInitialPolls (polls) {
    return(
    {
        type: RECIEVE_POLLS,
        polls: polls
    }
    )
}

export function addPoll (poll) {
    return(
        {
            type: ADD_POLL,
            poll
        }
    )
}

export function addAnswer ({answer, id, authedUser}) {
    return ({
        type: ADD_ANSWER,
        answer,
        id,
        authedUser
    })
}

export function handleAddAnswer (answer) {
    return (dispatch) => {

        dispatch(showLoading())

        return savePollAnswer(answer)
        .then(()=> dispatch(addAnswer(answer)))
        .then(()=> dispatch(hideLoading()))
    }
}



export function addPollToDB (poll) {
    //getState is second argument in thunk
    return (dispatch, getState) => {
        const {authedUserReducer} = getState()
        

        dispatch(showLoading())
        
        return savePoll ({
            ...poll,
            author: authedUserReducer
        })
            .then((poll)=> dispatch(addPoll(poll))) 
            .then(()=> dispatch(hideLoading()))
    }
}