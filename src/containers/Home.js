import React, {Component} from "react"

import "../styles/wrappers.css"
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {stateToUserProps} from "../reducers/user";

export class Home extends Component{
    render() {
        return (
            this.props.user.isAuthenticated ?<Redirect to={"/manage"} /> : <Redirect to={"/login"} />
        );
    }
}

export default connect(stateToUserProps) (Home)