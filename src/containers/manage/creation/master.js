import React, {Component} from 'react';
import {Container} from "reactstrap";
import Routes from "./Routes";

class CampaignCreationMaster extends Component {
    render() {
        return (
            <Container className={"create-campaign-wrapper"}>
                <Routes match={this.props.match}/>
            </Container>
        );
    }
}

export default CampaignCreationMaster;