import React from "react";
import {NavItem, NavLink, Popover, PopoverBody} from "reactstrap";
import {Icon} from '@mdi/react'
import {mdiExitRun} from '@mdi/js'
import {Auth} from 'aws-amplify'

import '../styles/utils.css'
import ButtonSpinable from "./ButtonSpinable";
import connect from "react-redux/es/connect/connect";
import {stateToUserProps} from "../reducers/user";

export class AccountNavbarEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loginPopoverOpen: false,
            loggingOut: false
        }
    }

    logoutHandler = async () => {
        console.debug("[DEBUG] MTH - AWS Cognito: User logout.");
        Auth.signOut()
            .then(() => {
                this.props.dispatch({type: "LOGOUT"});
            })
            .catch(e => {
                console.error(e);
            });
    };

    logOut() {
        this.setState({loggingOut: true});
        this.logoutHandler();
    }

    toggleLoginPopover() {
        this.setState({
            loginPopoverOpen: !this.state.loginPopoverOpen
        });
    }

    render() {
        return (
            <div>
                <NavItem>
                    <NavLink id="accountNavbarLink" onClick={this.toggleLoginPopover.bind(this)}>
                        <img src={this.props.user.infos.avatar} alt="avatar"
                             className="avatarImage"/>{this.props.user.infos.username}
                    </NavLink>
                </NavItem>
                <Popover target="accountNavbarLink" placement="bottom" isOpen={this.state.loginPopoverOpen}>
                    <PopoverBody>
                        <ButtonSpinable onClick={this.logOut.bind(this)} className="logoutBtn" block loading={this.state.loggingOut}>
                            <div>Log out <Icon path={mdiExitRun} size={1} color={"#fff"} className={'right-icon'}/>
                            </div>
                        </ButtonSpinable>
                    </PopoverBody>
                </Popover>
            </div>
        );
    }
}

export default connect(stateToUserProps) (AccountNavbarEntry);