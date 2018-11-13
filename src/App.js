import React, {Component} from 'react';
import Routes from './Routes'
import {Auth} from 'aws-amplify'
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap'
import {Link} from "react-router-dom";

//Config
import {urls, facebookAppID} from './config'

//Perso
import {store} from "./index";

//CSS
import './App.css';
import './styles/utils.css'
import './styles/loginPopoverStyle.css'
import UserNavItem from "./components/UserNavItem";
import {connect} from "react-redux";
import {stateToUserProps} from "./reducers/user";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openedSidenav: false
        };
    }

    async componentDidMount() {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: facebookAppID,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v3.1'
            });
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
        }
        catch (e) {
            if (e) {
                console.error("[AWS_Cogn] " + e);
            }
        }
        this.setState({isAuthenticating: false})
    }

    render() {
        return (
            !this.state.isAuthenticating &&
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
                            <NavItem><Link to={"/"}>About us</Link></NavItem>
                            <NavItem><Link to={"/manage"}>Manage your campaigns</Link></NavItem>
                            <UserNavItem/>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Routes match={this.props.match}/>
            </div>
        );
    }
}

export default connect(stateToUserProps) (App);
