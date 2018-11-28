import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import PropTypes from 'prop-types';

import e404 from "../../e404";
import CampaignCreationStep1 from "./step1";

class Routes extends Component {
    render() {
        console.log(this.props.match.url);
        return (
            <div>
                <Switch>
                    <Route exact path={`${this.props.match.url}/`} component={CampaignCreationStep1}/>
                    <Route exact path={`${this.props.match.url}/step1`} component={CampaignCreationStep1}/>
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