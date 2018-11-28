import React, {Component} from 'react';
import Background from "../components/Background";
import {Button, Container, Row} from "reactstrap";
import {Icon} from '@mdi/react'
import {mdiFacebook} from '@mdi/js'

import "../styles/loginPage.css"
import "../styles/bigRoundButton.css"
import {Link, withRouter} from "react-router-dom";
import LoginButton from "../components/LoginButton";
import queryString from 'query-string'
import {stateToUserProps} from "../reducers/user";
import {connect} from "react-redux";


class LoginPage extends Component {


    constructor(props) {
        super(props);
    }

    redirect_to_next = () => {
        const values = queryString.parse(this.props.location.search);
        this.props.history.push(values.next ? values.next : "/");
    };

    connectionError(e) {
        console.error(e);
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                <Background className={"loginRedirectionBackgroud"}/>
                <div className={"loginRedirectionWrapper"}>
                    <Container>
                        <h1 className={"wideHeader"}>my-TreasureHunt fun bots builder</h1>
                        <p className={"baitDisplay"}>Create Awesome <b>fun-bots</b> on Messenger ! No coding
                            and <b>Free</b>
                        </p>
                        <p className={"description"}>Engage your audience in real life through treasure hunt, course,
                            vote,
                            race, instant win or sweepstake. Enrich your visuals now ! </p>
                        <Row>
                            {!this.props.user.isAuthenticated
                                ? <LoginButton className={"bigRoundBtn facebook"} success={this.redirect_to_next}
                                               error={this.connectionError}>
                                        <span><Icon path={mdiFacebook}
                                                    size={1}/> Login using your facebook account</span>
                                </LoginButton>
                                :
                                <Button className={"bigRoundBtn facebook"} disabled><span><Icon path={mdiFacebook}
                                                                                                size={1}/> You are already logged in</span></Button>
                            }
                            <Link to={"/features"}><Button
                                className={"bigRoundBtn aboutBtn"}><span>Learn more</span></Button></Link>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(stateToUserProps)(LoginPage));