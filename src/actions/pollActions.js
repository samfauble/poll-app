import {getInitialData} from "../utils/api"
import {getInitialPolls} from "./polls"
import {getInitialUsers} from "./users"
import {setAuthedUser} from "./authedUser"
import {showLoading, hideLoading} from "react-redux-loading"


const AUTHED_ID="sarah_edo"


export function initializeData () {
    //thunks pass dispatch as an argument
    return (dispatch)=>{
        //show loading bar while data loads
        dispatch(showLoading()) 
    getInitialData().then(({polls, users})=>{
        dispatch(getInitialPolls(polls))
        dispatch(getInitialUsers(users))
        dispatch(setAuthedUser(AUTHED_ID))
        //hide loading bar when data finishes loading
        dispatch(hideLoading())
    })
    .catch(({message})=>{
        console.warn("We couldn't get your information", message)
    })
}
}

