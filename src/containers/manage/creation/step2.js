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

        this.state = {
            botNameHelpText: `0/${botNameMaxLength}`
        }
    }

    handleBotNameChange = (event) => {
        this.setState({botNameHelpText: `${event.target.value.length}/${botNameMaxLength}`})
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
                                       onChange={this.handleBotNameChange}/>
                                <FormText>{this.state.botNameHelpText}</FormText>
                            </FormGroup>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Row>
                                <Col xs={6}>
                                    <Label for="gameTypeSelect">Experience</Label>
                                    <Input type="select" id="gameTypeSelect" disabled>
                                        <option selected>Sweepstake</option>
                                        <option>Instant win</option>
                                        <option>Race</option>
                                    </Input>
                                </Col>
                                <Col xs={6}>
                                    <Label for="gameTypeSelect">Status</Label>
                                    <Input type="select" id="gameTypeSelect" disabled>
                                        <option selected>Test</option>
                                        <option>Active</option>
                                        <option>Finished</option>
                                        <option>Cancelled</option>
                                    </Input>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={6}>
                            <FormGroup>
                                <Label for="contactEmail" style={{display: 'flex'}}>Your contact email </Label>
                                <Input type="email" id="contactEmail" placeholder="email@example.com"/>
                                <FormText><i><b>No spam</b>, you will receive in real time the winners of the
                                    lottery and information on your bot.</i></FormText>
                            </FormGroup>
                        </Col>
                        <Col xs={12} xl={6}>
                            <Row>
                                <Col xs={12} sm={6}>
                                    <Label for="startDateField">Start date</Label>
                                    <Input type="date" id="startDateField"/>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Label for="endDateField">End date</Label>
                                    <Input type="date" id="endDateField"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <h5>Upload your images</h5>
                            <input id={"imageInput"} type="file" style={{display: "none"}} onChange={(e) => console.log(e.target)}/>
                            <Button style={{display: 'flex', justifyContent: 'space-around'}} className={'greenBtn'}
                                    onClick={() => document.getElementById('imageInput').click()}>
                                <Icon path={mdiImagePlus} size={1} style={{marginRight: '1em'}}/>Add an image
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <div>
                    <Link to={"step1"}>
                        <Button className={"NavigationButton BackButton"}>
                            Back
                            <Icon path={mdiSkipPrevious} size={1}/>
                        </Button>
                    </Link>
                    <Link to={"step3"}>
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