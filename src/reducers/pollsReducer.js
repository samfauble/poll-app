import {RECIEVE_POLLS, ADD_POLL, ADD_ANSWER} from "../actions/polls"

//here, state itself = pollsReducer slice of the state
export function pollsReducer (state={}, action) {
    switch(action.type) {
        case RECIEVE_POLLS:
            return {
                //spread out the state
                ...state,
                //spread out all of the polls
                ...action.polls
            }
        case ADD_POLL:
            return {
                ...state,
                //add a new poll
                [action.poll.id]: action.poll
            }
        case ADD_ANSWER:
            const {id, authedUser, answer} = action
            const poll = state[id]
            const voteKey = [answer] + "Votes"
            return {
                ...state,
                [action.id]: {
                    ...poll,
                    [voteKey]: poll[voteKey].concat([authedUser])
                }
            }
        default:
            return state
    }
}
