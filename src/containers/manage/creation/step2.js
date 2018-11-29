import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon} from '@mdi/react'
import {mdiSkipNext, mdiSkipPrevious} from '@mdi/js'
import {Link} from "react-router-dom";

import '../../../styles/campaignCreation/global.css'
import '../../../styles/utils.css'
import {Button} from "reactstrap";

class CampaignCreationStep2 extends Component {
    render() {
        return (
            <div>
                <Link to={"create/step1"}>
                    <Button className={"NavigationButton BackButton"}>
                        Back
                        <Icon path={mdiSkipPrevious} size={1}/>
                    </Button>
                </Link>
                <Link to={"create/step2"}>
                    <Button className={"NavigationButton NextButton"}>
                        Next
                        <Icon path={mdiSkipNext} size={1}/>
                    </Button>
                </Link>

            </div>
        );
    }
}

CampaignCreationStep2.propTypes = {};

export default CampaignCreationStep2;