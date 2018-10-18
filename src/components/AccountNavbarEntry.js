import React from "react";
import {NavItem, Button} from "reactstrap";
import {PulseLoader} from 'react-spinners'
import {Popover, PopoverHeader, PopoverBody} from "reactstrap";
import {Icon} from '@mdi/react'
import {mdiExitRun} from '@mdi/js'

import '../styles/utils.css'

export default class LoginNavbarEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loginPopoverOpen: false,
            loggingOut: false
        }
    }

    logOut() {
        this.setState({loggingOut: true});
        this.props.onLogout()
    }

    toggleLoginPopover() {
        this.setState({
            loginPopoverOpen: !this.state.loginPopoverOpen
        });
    }

    render() {

        let icon = ["Log out", <Icon path={mdiExitRun} size={1} color={"#fff"} className={'right-icon'} />];
        if (this.state.loggingOut)
        icon = <PulseLoader
            sizeUnit={"em"}
            size={0.4}
            loading={true} className="spinner"/>;

        return (
            <div id="accountNavbarEntry">
                <NavItem id="loginPopoverNavbarButton" onClick={this.toggleLoginPopover.bind(this)}>
                    <img src={this.props.user.avatar} alt="avatar" className="avatarImage"/>{this.props.user.username}
                </NavItem>
                <Popover target="loginPopoverNavbarButton" placement="bottom" isOpen={this.state.loginPopoverOpen}>
                    <PopoverBody>
                        <Button onClick={this.logOut.bind(this)} className="logoutBtn" block>{icon}</Button>
                    </PopoverBody>
                </Popover>

            </div>
        );
    }
}