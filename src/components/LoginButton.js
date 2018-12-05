import React, {Component} from 'react';
import ButtonSpinable from "./ButtonSpinable";
import {facebookFields, urls} from "../config";
import {Auth} from "aws-amplify";
import connect from "react-redux/es/connect/connect";
import {stateToUserProps} from "../reducers/user";
import PropTypes from 'prop-types'

class LoginButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    callErrorHandler = (e) => {
        this.setConnecting();
        if (this.props.error) {
            this.props.error(e)
        }
    };

    FacebookToAWS(tokenData, userData) {
        console.debug("[DEBUG] MTH - AWS Log i;n : ", tokenData, userData);
        Auth.federatedSignIn("facebook", {...tokenData}, {
            email: userData.email,
            username: userData.name,
            first_name: userData.first_name,
            last_name: userData.last_name,
            fbid: userData.id,
            avatar: urls.getFbAvatar(userData.id)
        }).then(credentials => {
            console.debug("[AWS_Cogn] Connection success.", credentials);
            Auth.currentAuthenticatedUser().then(user => {
                this.props.dispatch({type: "LOGIN", userData: user});
                if (this.props.success)
                    this.props.success(user);
            }).catch(e => this.callErrorHandler(e));
        }).catch(e => {
            console.error("[AWS_Cogn] ", e);
            this.callErrorHandler(e);
        });
    };

    fbLogin = () => {
        this.setConnecting(true);
        window.FB.login(r => {
            if (r.status === "connected") {
                let tokenData = {token: r.authResponse.accessToken, expires_at: r.authResponse.expiresIn * 1000 + new Date().getTime()};
                console.debug("[DEBUG] MTH - Facebook recieved connection", r);
                window.FB.api('/me', {fields: "email,name,last_name,first_name,id"}, userData => {
                    this.FacebookToAWS(tokenData, userData);
                });
            }
            else {
                console.debug("MTH - Facebook recieved response", r);
                this.callErrorHandler(r);
            }
        }, {fields: facebookFields});
    };

    setConnecting(bool = false) {
        this.setState({
            loading: bool
        })
    }

    render() {
        const {final, ...nextProps} = this.props;
        return (
            <ButtonSpinable loading={this.state.loading} {...nextProps} onClick={this.fbLogin}>
                {this.props.children}
            </ButtonSpinable>
        );
    }
}

LoginButton.propTypes = {success: PropTypes.func, failure: PropTypes.func};

export default connect(stateToUserProps)(LoginButton);