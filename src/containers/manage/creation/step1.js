import React, {Component} from 'react';
import {Button, Col, Row} from "reactstrap";

import {Icon} from '@mdi/react'
import {mdiSkipNext} from '@mdi/js'

import '../../../styles/campaignCreation/global.css'
import '../../../styles/campaignCreation/step1.css'
import '../../../styles/utils.css'
import {Link} from "react-router-dom";

class CampaignCreationStep1 extends Component {

    constructor(props) {
        super(props);

        let prefill = {
            game: 0,
            experience: 0
        };

        if (props.location.state && props.location.state.prefill)
            prefill = props.location.state.prefill;

        this.state = {
            prefill: prefill
        }
    }

    experienceSelect(id) {
        this.setState({prefill: Object.assign(this.state.prefill, {experience: id})});
    }

    gameSelect(id) {
        this.setState({prefill: Object.assign(this.state.prefill, {game: id})});
    }

    render() {
        return (
            <div>
                <div className={"TitleCenterWrapper"}>
                    <h1>Choose your fun bot experience</h1>
                </div>
                <div>
                    <Row>
                        <Col xs={12} xl={4}>
                            <Button className={"greenBtn BigChoiceButton"} disabled={this.state.prefill.experience === 1}
                                    onClick={() => this.experienceSelect(1)}>
                                <h3>Simple image matching</h3>
                                <span>Lorem Ipsum</span>
                            </Button>
                        </Col>
                        <Col xs={12} xl={4}>
                            <Button className={"greenBtn BigChoiceButton"} disabled={this.state.prefill.experience === 2}
                                    onClick={() => this.experienceSelect(2)}>
                                <h3>Vote</h3>
                                <span>Lorem Ipsum</span>
                            </Button>
                        </Col>
                        <Col xs={12} xl={4}>
                            <Button className={"greenBtn BigChoiceButton"} disabled={this.state.prefill.experience === 3}
                                    onClick={() => this.experienceSelect(3)}>
                                <h3>Treasure hunt</h3>
                                <span>Lorem Ipsum</span>
                            </Button>
                        </Col>
                    </Row>
                </div>
                <div style={{marginTop: '2em'}}>
                    <Row>
                        <Col xs={12} xl={4}>
                            <Button className={"greenBtn BigChoiceButton"} disabled={this.state.prefill.game === 1}
                                    onClick={() => this.gameSelect(1)}>
                                <h3>Sweepstake</h3>
                                <span>Lorem Ipsum</span>
                            </Button>
                        </Col>
                        <Col xs={12} xl={4}>
                            <Button className={"greenBtn BigChoiceButton"} disabled={this.state.prefill.game === 2}
                                    onClick={() => this.gameSelect(2)}>
                                <h3>Instant win</h3>
                                <span>Lorem Ipsum</span>
                            </Button>
                        </Col>
                        <Col xs={12} xl={4}>
                            <Button className={"greenBtn BigChoiceButton"} disabled={this.state.prefill.game === 3}
                                    onClick={() => this.gameSelect(3)}>
                                <h3>Race</h3>
                                <span>Lorem Ipsum</span>
                            </Button>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Link to={{
                        pathname: `step2`,
                        state: {prefill: this.state.prefill}
                    }}>
                        <Button className={"NavigationButton NextButton"}
                                disabled={!(this.state.prefill.experience && this.state.prefill.game)}>
                            Next
                            <Icon path={mdiSkipNext} size={1}/>
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default CampaignCreationStep1;