import React, { Component } from 'react'
import {connect} from "react-redux"
import {addPollToDB} from "../actions/polls"

export class AddPoll extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             question: "",
             a: "",
             b: "",
             c: "",
             d: "",
        }
    }
    
    handleChange = (e) => {
        let {name, value} = e.target
        this.setState(()=> ({
            [name] : value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        //redirect to homepage
        //add poll to poll fake database
        this.props.dispatch(addPollToDB(this.state))
        this.props.history.push("/")
    }

    isDisabled () {
        const {question, a, b, c, d} = this.state

        return (question === "" || a === "" || b === "" || c === "" || d === "" ?
                true : false) 
    }


    //for controlled components, DON'T give onChange a thunk function
    // add () to function invocation if function not a thunk
    render() {
        return (
            <React.Fragment>
            <form onSubmit={this.handleSubmit} className="add-form">
                <div>
                    <label>What is your question?</label>
                    <input 
                        value={this.state.question}
                        name="question"
                        onChange={this.handleChange}
                        className="input" 
                        type="text" />
                </div>
                <div>
                    <label>What are the options?</label>
                    <label className="label"
                            htmlFor="a">
                                <h4>A.</h4>
                    </label>
                    <input 
                        value={this.state.a}
                        name="a"
                        onChange={this.handleChange} 
                        className="input" 
                        type="text" />
                    <label className="label"
                            htmlFor="b">
                                <h4>B.</h4>
                    </label>
                    <input 
                        value={this.state.b}
                        name="b" 
                        onChange={this.handleChange}
                        className="input" 
                        type="text" />
                    <label className="label"
                            htmlFor="c">
                                <h4>C.</h4>
                    </label>
                    <input 
                        value={this.state.c}
                        name="c" 
                        onChange={this.handleChange} 
                        className="input" 
                        type="text" />
                    <label className="label"
                            htmlFor="d">
                                <h4>D.</h4>
                    </label>
                    <input 
                        value={this.state.d}
                        name="d"
                        onChange={this.handleChange} 
                        className="input" 
                        type="text" />
                </div>
                <button 
                    type="submit"
                    className="btn"
                    disabled = {this.isDisabled()}>
                        Submit
                </button>
            </form>
            </React.Fragment>
        )
    }
}

export default connect()(AddPoll)
