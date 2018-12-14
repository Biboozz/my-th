import React, {Component} from 'react';
import Routes from './Routes'
import {Auth} from 'aws-amplify'
import {Collapse, Nav, Navbar, NavbarToggler, NavItem} from 'reactstrap'
import {Link, withRouter} from "react-router-dom";
//Config
import {facebookAppID, urls} from './config'
//Perso
import {store} from "./index";
//CSS
import './App.css';
import './styles/utils.css'
import './styles/loginPopoverStyle.css'
import UserNavItem from "./components/UserNavItem";
import {connect} from "react-redux";
import {stateToUserProps} from "./reducers/user";
import DebugRouter from "./DebugRouter";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openedSidenav: false,
            isAuthenticating: true
        };
    }

    async componentDidMount() {
        window.fbLoaded = [];

        window.fbAsyncInit = function () {
            window.FB.init({
                appId: facebookAppID,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v3.1'
            });

            for (let i in window.fbLoaded) {
                console.log(typeof window.fbLoaded[i]);
                window.fbLoaded[i]()
            }
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = urls.FacebookSDK;
            console.log(`Facebook SDK: ${js.src}`);
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        try {
            const state = store.getState();
            if (!state.user.isAuthenticated)
                await Auth.currentAuthenticatedUser().then(user => {
                    store.dispatch({type: "LOGIN", userData: user})
                });
        } catch (e) {
            if (e) {
                console.error("[AWS_Cogn] " + e);
            }
        }
        this.setState({isAuthenticating: false})
    }

    render() {
        return (
            !this.state.isAuthenticating &&
            <DebugRouter>
                <div className="appWrapper" id="App">
                    <Navbar color="light" light expand="md">
                        <Link to={"/"}>
                            <img alt="logo my-TreasureHunt"
                                 src="https://my-treasurehunt.com/assets/images/logositethmaj2017-430x90.jpg"
                                 style={{maxHeight: "50px", margin: "none"}}/>
                        </Link>
                        <NavbarToggler onClick={() => {
                            this.setState({openedSidenav: !this.state.openedSidenav});
                        }}/>
                        <Collapse navbar style={{paddingRight: "5em"}} isOpen={this.state.openedSidenav}>
                            <Nav className="ml-auto main-navbar" navbar>
                                <NavItem><Link to={"/features"}>Features</Link></NavItem>
                                <NavItem><a href={"https://www.my-treasurehunt.com/"}>Back to site</a></NavItem>
                                <UserNavItem/>
                            </Nav>
                        </Collapse>
                    </Navbar>
                    <Routes match={this.props.match}/>
                </div>
            </DebugRouter>
        );
    }
}

export default withRouter(connect(stateToUserProps)(App));
