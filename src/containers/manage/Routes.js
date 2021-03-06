import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import PropTypes from 'prop-types';

import e404 from "../e404";
import ManageCampaignHome from "./ManageCampaignHome";
import CampaignCreationMaster from "./creation/master";

class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={`${this.props.match.url}/`} component={ManageCampaignHome}/>
                    <Route path={`${this.props.match.url}/create`} render={(props) => <CampaignCreationMaster {...props}/>}/>
                    {/*<Route exact path={`${this.props.match.url}/:campaignId`}*/}
                    {/*render={(props) => <ManageCampaign {...props} campaignsList={CampaignStartList} />}/>*/}
                    <Route component={e404}/>
                </Switch>
            </div>
        );
    }
}

Routes.propTypes = {
    match: PropTypes.any.isRequired
};

export default Routes;