import {RECIEVE_USERS} from "../actions/users"
import {ADD_POLL, ADD_ANSWER} from "../actions/polls"
import {SET_AUTHED_USER} from "../actions/authedUser"

export function userReducer(state={}, action) {
    switch (action.type) {
        case RECIEVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_ANSWER:
            const {authedUser} = action
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: state[authedUser].answers.concat([action.id])
                }
            }
        case ADD_POLL:
            const poll = action.poll
            const {author, id} = poll
            return {
                //keep the old state except...
                ...state,
                //at [author],
                [author]: {
                    //keep the old state of the author except
                    ...state[author],
                    //at polls, change the value of polls by adding id of id to the array of poll ids
                    polls: state[author].polls.concat([id])
                }
            }
        default:
            return state
    }
}

export function authedUserReducer(state= null, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
                //Return action.id as this slice of the state
                return action.id
        default:
                return state
    }
}