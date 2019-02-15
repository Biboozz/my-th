import React, {Component} from 'react';
import {connect} from 'react-redux';
import {stateToUserProps} from "../reducers/user";
import {withRouter} from "react-router-dom";
import {urls} from "../config";

export default function(ComposedComponent) {
    class Authentication extends Component {
        checkAuthentication(user=this.props.user) {
            return user.isAuthenticated
        }

        redirect(url=urls.loginUrl) {
            this.props.history.push(url + "?next=" + this.props.location.pathname);

        }

        componentWillMount() {
            if (!this.checkAuthentication())
                this.redirect()
        }

        componentWillUpdate(nextProps) {
            if (!this.checkAuthentication(nextProps.user))
                this.redirect()
        }

        render() {
            return this.checkAuthentication() ? <ComposedComponent {...this.props} /> : null
        }
    }

    return withRouter(connect(stateToUserProps)(Authentication));
}