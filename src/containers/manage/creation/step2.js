import React, {Component} from 'react';
import PropTypes from 'prop-types'
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
import {SummaryGame, SummaryStatus} from "./components/summary";
import Field from "./components/FieldGenericClass";

class CampaignCreationStep2 extends Component {

    constructor(props) {
        super(props);

        if (props.location.state && props.location.state.prefill) {
            this.state = {
                prefill: props.location.state.prefill,
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
                            <BotName onChange={this.updatePrefill} value={this.state.prefill.botName}/>
                        </Col>
                        <Col sm={12} lg={6}>
                            <Row>
                                <Col sm={6}>
                                    <SummaryGame value={this.state.prefill.game}/>
                                </Col>
                                <Col sm={6}>
                                    <SummaryStatus/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} lg={6}>
                            <Email onChange={this.updatePrefill} value={this.state.prefill.contactEmail}/>
                        </Col>
                        <Col sm={12} lg={6}>
                            <Row>
                                <Col xs={12} sm={6} lg={6}>
                                    <StartDate onChange={this.updatePrefill} value={this.state.prefill.startDate}/>

                                </Col>
                                <Col xs={12} sm={6} lg={6}>
                                    <EndDate onChange={this.updatePrefill} value={this.state.prefill.endDate}/>
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
                    <div style={{display: 'flex', flexFlow: "row-reverse nowrap"}}>
                        <Button className={"NavigationButton NextButton"}>
                            Next
                            <Icon path={mdiSkipNext} size={1}/>
                        </Button>
                        <div style={{flexGrow: 1}}/>
                        <Link to={{pathname: `step1`, state: {prefill: this.state.prefill}}}>
                            <Button className={"NavigationButton BackButton"}>
                                Back
                                <Icon path={mdiSkipPrevious} size={1}/>
                            </Button>
                        </Link>
                    </div>
                </Form>
            </div>
        );
    }
}

class BotName extends Field {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <FormGroup>
                    <Label for="botName">Your fun bot name *</Label>
                    <Input id="botName" name="botName" placeholder="Name" maxLength={50}
                           onChange={this.props.onChange} value={this.props.value} required/>
                    <FormText>{`${(typeof this.props.value === 'string') ? this.props.value.length : '0'}/${botNameMaxLength}`}</FormText>
                </FormGroup>
            </div>
        );
    }
}

class Email extends Field {
    render() {
        return (
            <FormGroup>
                <Label for="contactEmail" style={{display: 'flex'}}>Your contact email *</Label>
                <Input onChange={this.props.onChange} type="email" id="contactEmail" name="contactEmail"
                       placeholder="email@example.com" value={this.props.value}
                       required/>
                <FormText><i><b>No spam</b>, you will receive in real time the winners of the
                    lottery and information on your bot.</i></FormText>
            </FormGroup>
        );
    }
}

class StartDate extends Field {
    render() {
        return (
            <FormGroup>
                <Label for="startDate">Start date *</Label>
                <Input onChange={this.props.onChange} type="date" id="startDate" name="startDate"
                       value={this.props.value} required/>
            </FormGroup>
        );
    }
}

class EndDate extends Field {
    render() {
        return (
            <FormGroup>
                <Label for="startDate">End date *</Label>
                <Input onChange={this.props.onChange} type="date" id="endDate" name="endDate"
                       value={this.props.value} required/>
            </FormGroup>
        );
    }
}

export default CampaignCreationStep2;