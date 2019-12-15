import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import {Provider} from "react-redux"
import {createStore, applyMiddleware} from "redux"
import {allReducers} from "./reducers/allReducers"
import {createLogger} from "redux-logger"
import thunk from "redux-thunk"
import {BrowserRouter as Router} from "react-router-dom"


const logger = createLogger()
// import createStore, not Redux
export const store = createStore(allReducers, applyMiddleware(thunk, logger))


console.log(store.getState())

ReactDOM.render(
    //Use the store attribute here
    //Wrap the App component in the ReactDOM.render statement
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
     document.getElementById('root'))