import React, {Component} from 'react';
import {Icon} from '@mdi/react'
import {mdiPlus, mdiWorker} from "@mdi/js";
import {Container} from "reactstrap";

import {CampaignStartList} from "../../classes/Campaign";
import ListCampaigns from "./List Campaigns";
import FloatingButtonAction from "../../components/FloatingButtonAction";

import "../../styles/utils.css"
import {Link} from "react-router-dom";

class ManageCampaignHome extends Component {
    render() {
        return (
            <div>
                <Container id="manageHome" style={{marginTop: "2em"}}>
                    <ListCampaigns list={CampaignStartList}/>
                    <div className="test_text" style={{paddingTop: "100px"}}>
                        <h1>Work in progress</h1>
                        <ul style={{listStyleType: 'none', padding: 0}}>
                            <li>Do not expect all behaviours to work</li>
                            <li>Somme color might be altered because of markup visualisation</li>
                            <li>Styling is a draft here</li>
                            <li><code>Strawberry pie</code></li>
                        </ul>
                        <Icon path={mdiWorker} size={4} color="#999" style={{opacity: 0.2}}/>
                    </div>
                </Container>
                <Link to={"manage/create"}>
                    <FloatingButtonAction className={"greenBtn"}>
                        <Icon path={mdiPlus} size={1}/>
                    </FloatingButtonAction>
                </Link>
            </div>
        );
    }
}

ManageCampaignHome.propTypes = {};

export default ManageCampaignHome;