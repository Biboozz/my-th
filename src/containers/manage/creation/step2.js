import React, {Component} from 'react';
import {Icon} from '@mdi/react'
import {mdiSkipNext, mdiSkipPrevious} from '@mdi/js'
import {Link, Redirect} from "react-router-dom";
import {Button, Col, Form, FormGroup, FormText, Input, Label, Row} from "reactstrap";
import {botNameMaxLength} from "../../../config";

import '../../../styles/campaignCreation/global.css'
import '../../../styles/campaignCreation/step2.css'
import '../../../styles/utils.css'
import {mdiImagePlus} from "@mdi/js/commonjs/mdi";
import produce from "immer";

class CampaignCreationStep2 extends Component {

    constructor(props) {
        super(props);

        if (props.location.state && props.location.state.prefill) {
            this.state = {
                prefill: props.location.state.prefill,
                botNameHelpText: `0/${botNameMaxLength}`,
                redirectNext: false
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({redirectNext: true})
    };

    updatePrefill = (event) => {
        this.setState({
            prefill: produce(this.state.prefill, draftPrefill => {
                draftPrefill[event.target.id] = event.target.value
            })
        });
    };

    handleBotNameChange = (event) => {
        this.setState({botNameHelpText: `${event.target.value.length}/${botNameMaxLength}`});
        this.updatePrefill(event);
    };

    render() {
        if (this.state.redirectNext === true) {
            return <Redirect to={{pathname: `step3`, state: {prefill: this.state.prefill}}} push/>
        }

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col sm={12} lg={6}>
                            <FormGroup>
                                <Label for="botName">Your fun bot name *</Label>
                                <Input id="botName" name="botName" placeholder="Name" maxLength={50}
                                       onChange={this.handleBotNameChange} value={this.state.prefill.botName} required/>
                                <FormText>{this.state.botNameHelpText}</FormText>
                            </FormGroup>
                        </Col>
                        <Col sm={12} lg={6}>
                            <Row>
                                <Col sm={6}>
                                    <Label for="gameType">Experience</Label>
                                    <Input type="select" id="gameType" name="gameType" disabled
                                           defaultValue={this.state.prefill.experience}>
                                        <option value={"sweepstake"}>Sweepstake</option>
                                        <option value={"instantwin"}>Instant win</option>
                                        <option value={"race"}>Race</option>
                                    </Input>
                                </Col>
                                <Col sm={6}>
                                    <Label for="statusType">Status</Label>
                                    <Input type="select" id="statusType" name="statusType" disabled defaultValue={1}>
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
                        <Col sm={12} lg={6}>
                            <FormGroup>
                                <Label for="contactEmail" style={{display: 'flex'}}>Your contact email *</Label>
                                <Input onChange={this.updatePrefill} type="email" id="contactEmail" name="contactEmail"
                                       placeholder="email@example.com" value={this.state.prefill.contactEmail}
                                       required/>
                                <FormText><i><b>No spam</b>, you will receive in real time the winners of the
                                    lottery and information on your bot.</i></FormText>
                            </FormGroup>
                        </Col>
                        <Col sm={12} lg={6}>
                            <Row>
                                <Col xs={12}  sm={6} lg={6}>
                                    <Label for="startDate">Start date *</Label>
                                    <Input onChange={this.updatePrefill} type="date" id="startDate" name="startDate"
                                           value={this.state.prefill.startDate} required/>
                                </Col>
                                <Col xs={12}  sm={6} lg={6}>
                                    <Label for="endDate">End date *</Label>
                                    <Input onChange={this.updatePrefill} type="date" id="endDate" name="endDate"
                                           value={this.state.prefill.endDate} required/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <h5>Upload your images</h5>
                            <input id="imageInput" name="imageInput" type="file" style={{display: "none"}}
                                   onChange={(e) => console.log(e.target)}/>
                            <Button style={{display: 'flex', justifyContent: 'space-around'}} className={'greenBtn'}
                                    onClick={() => document.getElementById('imageInput').click()}>
                                <Icon path={mdiImagePlus} size={1} style={{marginRight: '1em'}}/>Add an image
                            </Button>
                        </Col>
                    </Row>
                    <div>
                        <Link to={{pathname: `step1`, state: {prefill: this.state.prefill}}}>
                            <Button className={"NavigationButton BackButton"}>
                                Back
                                <Icon path={mdiSkipPrevious} size={1}/>
                            </Button>
                        </Link>
                        <Button className={"NavigationButton NextButton"}>
                            Next
                            <Icon path={mdiSkipNext} size={1}/>
                        </Button>
                    </div>
                </Form>

            </div>
        );
    }
}

CampaignCreationStep2.propTypes = {};

export default CampaignCreationStep2;