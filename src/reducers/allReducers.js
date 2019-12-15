import {userReducer, authedUserReducer} from "./userReducer"
import {pollsReducer} from "./pollsReducer"
import {combineReducers} from "redux"
//loadingBarReducer is a reducer
import {loadingBarReducer} from "react-redux-loading"


//export default lets you import functions without needing to use { }

export const allReducers = combineReducers({
    pollsReducer, 
    userReducer, 
    authedUserReducer, 
    loadingBar: loadingBarReducer
})