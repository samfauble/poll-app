import React, { Component } from 'react'
import { connect } from 'react-redux'
import {initializeData} from "../actions/pollActions"
import Home from "../components/Home"
import LoadingBar from "react-redux-loading"
import Leaderboard from "./Leaderboard"
import AddPoll from "./AddPoll"
import Poll from "./Poll"
import {BrowserRouter as Router, Route} from "react-router-dom"
import Navbar from "./Navbar"


class App extends Component {
  

  //call dispatch in componentDidMount
  //because we connected this component w/ the store, we have access to all store state and methods as props
  componentDidMount() {
    this.props.dispatch(initializeData())
  }


  render() {
    console.log(this.props.loading)
    return (
      <Router>
      <div>
        <LoadingBar />
        <div className="container">
          <Navbar />
          {this.props.loading === true ? null : 
            <div>
              <Route exact path="/" component={Home} />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route path="/add" component={AddPoll} />
              <Route path="/poll/:id" component={Poll} />
            </div>
          }
        </div>
      </div>
      </Router>
    )
  }
}

//Make sure you are using the correct variable name
function mapStateToProps ({authedUserReducer}) {

  
  //If there is no authedUser, loading is true
  // authedUser's reducer is the last to run. When it's finished, we are done loaing all data
  return {
    loading: authedUserReducer === null,
  }
}

export default connect(mapStateToProps)(App)

//Below is how you can pass needed state from store to component

/* connect({
  state: value
})(App) */