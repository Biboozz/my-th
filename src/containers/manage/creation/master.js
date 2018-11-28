import React, {Component} from 'react';
import {Container} from "reactstrap";
import Routes from "./Routes";

class CampaignCreationMaster extends Component {
    render() {
        return (
            <Container>
                <Routes match={this.props.match}/>
            </Container>
        );
    }
}

export default CampaignCreationMaster;