import React, {Component} from 'react';
import {Icon} from '@mdi/react'
import {mdiSkipNext, mdiSkipPrevious} from '@mdi/js'
import {Link} from "react-router-dom";
import {Button, Col, Form, FormGroup, FormText, Input, Label, Row} from "reactstrap";
import {botNameMaxLength} from "../../../config";

import '../../../styles/campaignCreation/global.css'
import '../../../styles/campaignCreation/step2.css'
import '../../../styles/utils.css'
import {mdiImagePlus} from "@mdi/js/commonjs/mdi";

class CampaignCreationStep2 extends Component {

    constructor(props) {
        super(props);

        if (props.location.state && props.location.state.prefill) {
            this.state = {
                prefill: props.location.state.prefill,
                botNameHelpText: `0/${botNameMaxLength}`
            }
        }
    }

    updatePrefill = (event) => {
        let newPrefill = Object.assign({}, this.state.prefill);
        newPrefill[event.target.id] = event.target.value;
        this.setState({prefill: newPrefill});
    };

    handleBotNameChange = (event) => {
        this.setState({botNameHelpText: `${event.target.value.length}/${botNameMaxLength}`});
        this.updatePrefill(event);
    };

    render() {
        return (
            <div>
                <Form>
                    <Row>
                        <Col xs={12} sm={6}>
                            <FormGroup>
                                <Label for="botName">Your fun bot name</Label>
                                <Input id="botName" placeholder="Name" maxLength={50}
                                       onChange={this.handleBotNameChange} value={this.state.prefill.botName}/>
                                <FormText>{this.state.botNameHelpText}</FormText>
                            </FormGroup>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Row>
                                <Col xs={6}>
                                    <Label for="gameType">Experience</Label>
                                    <Input type="select" id="gameType" disabled
                                           defaultValue={this.state.prefill.experience}>
                                        <option value={"sweepstake"}>Sweepstake</option>
                                        <option value={"instantwin"}>Instant win</option>
                                        <option value={"race"}>Race</option>
                                    </Input>
                                </Col>
                                <Col xs={6}>
                                    <Label for="statusType">Status</Label>
                                    <Input type="select" id="statusType" disabled defaultValue={1}>
                                        <option value={1}>Test</option>
                                        <option value={2}>Active</option>
                                        <option value={3}>Finished</option>
                                        <option value={4}>Cancelled</option>
                                    </Input>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={6}>
                            <FormGroup>
                                <Label for="contactEmail" style={{display: 'flex'}}>Your contact email </Label>
                                <Input onChange={this.updatePrefill} type="email" id="contactEmail"
                                       placeholder="email@example.com" value={this.state.prefill.contactEmail}/>
                                <FormText><i><b>No spam</b>, you will receive in real time the winners of the
                                    lottery and information on your bot.</i></FormText>
                            </FormGroup>
                        </Col>
                        <Col xs={12} xl={6}>
                            <Row>
                                <Col xs={12} sm={6}>
                                    <Label for="startDate">Start date</Label>
                                    <Input onChange={this.updatePrefill} type="date" id="startDate"
                                           value={this.state.prefill.startDate}/>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Label for="endDate">End date</Label>
                                    <Input onChange={this.updatePrefill} type="date" id="endDate"
                                           value={this.state.prefill.endDate}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <h5>Upload your images</h5>
                            <input id={"imageInput"} type="file" style={{display: "none"}}
                                   onChange={(e) => console.log(e.target)}/>
                            <Button style={{display: 'flex', justifyContent: 'space-around'}} className={'greenBtn'}
                                    onClick={() => document.getElementById('imageInput').click()}>
                                <Icon path={mdiImagePlus} size={1} style={{marginRight: '1em'}}/>Add an image
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <div>
                    <Link to={{pathname: `step1`, state: {prefill: this.state.prefill}}}>
                        <Button className={"NavigationButton BackButton"}>
                            Back
                            <Icon path={mdiSkipPrevious} size={1}/>
                        </Button>
                    </Link>
                    <Link to={{pathname: `step3`, state: {prefill: this.state.prefill}}}>
                        <Button className={"NavigationButton NextButton"}>
                            Next
                            <Icon path={mdiSkipNext} size={1}/>
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

CampaignCreationStep2.propTypes = {};

export default CampaignCreationStep2;