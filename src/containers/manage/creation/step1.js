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
            experience: null
        };

        if (props.location.state && props.location.state.prefill)
            prefill = props.location.state.prefill;

        this.state = {
            prefill: prefill
        }
    }

    experienceSelect(id, active) {
        if (active)
            this.setState({prefill: Object.assign({},this.state.prefill, {experience: id})});
        else
            this.setState({prefill: Object.assign({},this.state.prefill, {experience: null})})
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
                        <Col sm={12} lg={4}>
                            <Button className={"greenBtn BigChoiceButton"}
                                    disabled={this.state.prefill.game === "simpleimage"}
                                    onClick={() => this.gameSelect("simpleimage")}>
                                <h3>Simple image matching</h3>
                                <span>Lorem Ipsum</span>
                            </Button>
                        </Col>
                        <Col sm={12} lg={4}>
                            <Button className={"greenBtn BigChoiceButton"} disabled={this.state.prefill.game === "vote"}
                                    onClick={() => this.gameSelect("vote")}>
                                <h3>Vote</h3>
                                <span>Lorem Ipsum</span>
                            </Button>
                        </Col>
                        <Col sm={12} lg={4}>
                            <Button className={"greenBtn BigChoiceButton"}
                                    disabled={this.state.prefill.game === "treasurehunt"}
                                    onClick={() => this.gameSelect("treasurehunt")}>
                                <h3>Treasure hunt</h3>
                                <span>Lorem Ipsum</span>
                            </Button>
                        </Col>
                    </Row>
                </div>
                <div style={{marginTop: '2em'}}>
                    <Row>
                        <Col sm={12} lg={4}>
                            <ChoiceButton onChange={(active) => this.experienceSelect("sweepstake", active)} active={this.state.prefill.experience === "sweepstake"}>
                                <h3>Sweepstake</h3>
                                <span>Lorem Ipsum</span>
                            </ChoiceButton>
                        </Col>
                        <Col sm={12} lg={4}>
                            <ChoiceButton onChange={(active) => this.experienceSelect("instantwin", active)} active={this.state.prefill.experience === "instantwin"}>
                                <h3>Instant win</h3>
                                <span>Lorem Ipsum</span>
                            </ChoiceButton>
                        </Col>
                        <Col sm={12} lg={4}>
                            <ChoiceButton onChange={(active) => this.experienceSelect("race", active)} active={this.state.prefill.experience === "race"}>
                                <h3>Race</h3>
                                <span>Lorem Ipsum</span>
                            </ChoiceButton>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Link to={{pathname: `/manage/create/step2`, state: {prefill: this.state.prefill}}}>
                        <Button className={"NavigationButton NextButton greenBtn"}
                                disabled={!(this.state.prefill.game)}>
                            Next
                            <Icon path={mdiSkipNext} size={1}/>
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

class ChoiceButton extends Component {
    change = () => {
        this.props.onChange(!this.props.active);
    };

    render() {
        return (
            <Button className={`greenBtn BigChoiceButton ${this.props.active ? "activeChoiceButton" : ""}`}
                    onClick={this.change}>
                {this.props.children}
            </Button>)
    }
}

export default CampaignCreationStep1;