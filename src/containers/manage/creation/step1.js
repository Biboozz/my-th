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

        this.state = {
            experience: null,
            game: null
        }
    }

    experienceSelect(id) {
        this.setState({
            experience: id
        })
    }

    gameSelect(id) {
        this.setState({
            game: id
        })
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
                            <Button className={"greenBtn BigChoiceButton"} disabled={this.state.experience === 1}
                                    onClick={() => this.experienceSelect(1)}>
                                <h3>Simple image matching</h3>
                                <span>Lorem Ipsum</span>
                            </Button>
                        </Col>
                        <Col xs={12} xl={4}>
                            <Button className={"greenBtn BigChoiceButton"} disabled={this.state.experience === 2}
                                    onClick={() => this.experienceSelect(2)}>
                                <h3>Vote</h3>
                                <span>Lorem Ipsum</span>
                            </Button>
                        </Col>
                        <Col xs={12} xl={4}>
                            <Button className={"greenBtn BigChoiceButton"} disabled={this.state.experience === 3}
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
                            <Button className={"greenBtn BigChoiceButton"} disabled={this.state.game === 1}
                                    onClick={() => this.gameSelect(1)}>
                                <h3>Sweepstake</h3>
                                <span>Lorem Ipsum</span>
                            </Button>
                        </Col>
                        <Col xs={12} xl={4}>
                            <Button className={"greenBtn BigChoiceButton"} disabled={this.state.game === 2}
                                    onClick={() => this.gameSelect(2)}>
                                <h3>Instant win</h3>
                                <span>Lorem Ipsum</span>
                            </Button>
                        </Col>
                        <Col xs={12} xl={4}>
                            <Button className={"greenBtn BigChoiceButton"} disabled={this.state.game === 3}
                                    onClick={() => this.gameSelect(3)}>
                                <h3>Race</h3>
                                <span>Lorem Ipsum</span>
                            </Button>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Link to={`{this.pro}`}>
                        <Button className={"NavigationButton NextButton"} disabled={!(this.state.experience && this.state.game)}>
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