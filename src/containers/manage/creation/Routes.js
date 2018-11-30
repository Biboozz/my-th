import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import PropTypes from 'prop-types';

import e404 from "../../e404";
import CampaignCreationStep1 from "./step1";
import CampaignCreationStep2 from "./step2";
import requireStateKey from "../../../components/requireStateKey";
import CampaignCreationStep3 from "./step3";

class Routes extends Component {
    render() {
        console.log(this.props.match.url);
        return (
            <div>
                <Switch>
                    <Route exact path={`${this.props.match.url}/`} component={CampaignCreationStep1}/>
                    <Route exact path={`${this.props.match.url}/step1`} component={CampaignCreationStep1}/>
                    <Route exact path={`${this.props.match.url}/step2`}
                           component={requireStateKey("prefill", `${this.props.match.url}/step1`, CampaignCreationStep2)}/>
                    <Route exact path={`${this.props.match.url}/step3`}
                           component={requireStateKey("prefill", `${this.props.match.url}/step1`, CampaignCreationStep3)}/>
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