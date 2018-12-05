import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

export default function (key, redirectionUrl, ComposedComponent) {
    class withStateKey extends Component {
        keyIsDefined() {
            return (this.props.location !== undefined
                && this.props.location.state !== undefined
                && (key in this.props.location.state))
        }

        redirect() {
            this.props.history.push(redirectionUrl);
        }

        componentWillMount() {
            if (!this.keyIsDefined())
                this.redirect()
        }

        componentWillUpdate(nextProps) {
            if (!this.keyIsDefined())
                this.redirect()
        }

        render() {
            return this.keyIsDefined() ? <ComposedComponent {...this.props} /> : null
        }
    }

    return withRouter(withStateKey);
}