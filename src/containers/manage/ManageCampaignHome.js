import React, {Component} from 'react';
import {Icon} from '@mdi/react'
import {mdiPlus} from "@mdi/js";
import {Container} from "reactstrap";

import {CampaignStartList} from "../../classes/Campaign";
import ListCampaigns from "./List Campaigns";
import FloatingButtonAction from "../../components/FloatingButtonAction";

import "../../styles/utils.css"
import {Link} from "react-router-dom";
import BigButton from "../../components/bigButton";

class ManageCampaignHome extends Component {
    render() {
        return (
            <div>
                <Container id="manageHome" style={{marginTop: "2em"}}>
                    <div style={{margin: "2em auto", justifyContent: "space-between"}}
                         className={"flexbox vcenter hide-on-small"}>
                        <h2 style={{margin: '0'}}>Your fun bots</h2>
                        <Link to={`${this.props.location.pathname}/create`}>
                            <BigButton className={"greenBtn"}>
                                <div style={{width: "100%", height: "100%"}} className={"flexbox"}>
                                    <Icon path={mdiPlus} size={1} style={{marginRight: ".5rem"}}/>
                                    <span style={{margin: "auto 0"}}>Create new</span>
                                </div>
                            </BigButton>
                        </Link>
                    </div>

                    <ListCampaigns list={CampaignStartList}/>
                </Container>
                <div className={"on-small-only"}>
                    <Link to={`${this.props.location.pathname}/create`}>
                        <FloatingButtonAction className={"greenBtn"}>
                            <Icon path={mdiPlus} size={1}/>
                        </FloatingButtonAction>
                    </Link>
                </div>
            </div>
        );
    }
}

ManageCampaignHome.propTypes = {};

export default ManageCampaignHome;