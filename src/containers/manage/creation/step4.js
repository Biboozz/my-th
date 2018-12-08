import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {Link} from "react-router-dom";
import {Icon} from '@mdi/react'
import {
    mdiAlertCircle,
    mdiImagePlus,
    mdiInformationVariant,
    mdiPen,
    mdiPlus,
    mdiSkipNext,
    mdiSkipPrevious
} from '@mdi/js'

import '../../../styles/campaignCreation/global.css'
import '../../../styles/campaignCreation/step4.css'
import produce from "immer";
import SwitchButton from "../../../components/switch";
import Field from "./components/FieldGenericClass";

function extractValue(dict, key, elseRet = null) {
    if (dict && key in dict) {
        return dict['key']
    }
    return elseRet
}

//TODO: Work for sm and md
export default class CampaignCreationStep4 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prefill: props.location.state.prefill
        }
    }

    addLot = (event) => {
        event.preventDefault();
        this.setState({
            prefill: produce(this.state.prefill, draftPrefill => {
                if (!draftPrefill.prizes)
                    draftPrefill.prizes = [];
                draftPrefill.prizes.push({
                    name: event.target.lotName.value,
                    description: event.target.lotDescription.value,
                    quantity: event.target.lotQuantity.value
                });
                event.target.lotName.value = null;
                event.target.lotDescription.value = null;
                event.target.lotQuantity.value = 0;
            })
        })
    };

    editLot = (event, id) => {
        event.preventDefault();
        this.setState({
            prefill: produce(this.state.prefill, draftPrefill => {
                if (!draftPrefill.prizes)
                    draftPrefill.prizes = [];
                let newLot = {
                    name: event.target.lotName.value,
                    description: event.target.lotDescription.value,
                    quantity: event.target.lotQuantity.value
                };
                if (draftPrefill.prizes[id])
                    draftPrefill.prizes[id] = newLot;
            })
        })
    };

    updatePrefill = (event) => {
        console.log(this.state.prefill);
        this.setState({
            prefill: produce(this.state.prefill, draftPrefill => {
                draftPrefill[event.target.id] = event.target.value;
            })
        });
    };

    render() {
        return (
            <div>
                <PrizeSection add={this.addLot} edit={this.editLot} prizes={this.state.prefill.prizes}/>
                <Form>

                    <PrizeWinMessage onChange={this.updatePrefill} value={this.state.prefill.prizeWinMessage}/>

                    {/*TODO: Messenger form*/}

                    <Alert color={'secondary'}>
                        <Row style={{width: '95%'}}>
                            <Col xs={3} md={2} lg={1}>
                                <Icon path={mdiInformationVariant} color={"#686868"} style={{width: '100%'}}/>
                            </Col>
                            <Col xs={9} md={10} lg={11}>
                                <p style={{margin: 'auto'}}>You will automatically receive on your contact email you
                                    filled
                                    before the Messenger PSID
                                    of
                                    the winners and their attached prize. If you want to match these Messenger PSID with
                                    Facebook ID, you can follow these instructions on <a
                                        href={"https://developers.facebook.com/idocs/messenger-platform/identity/id-matching/"}>developers.facebook.com</a>
                                </p>
                            </Col>
                        </Row>
                    </Alert>

                    <Alert color={'danger'}>
                        <Row style={{width: '95%'}}>
                            <Col xs={3} md={2} lg={1}>
                                <Icon path={mdiAlertCircle} color={"#d20000"} style={{width: '100%'}}/>
                            </Col>
                            <Col xs={9} md={10} lg={11}>
                                <p style={{margin: 'auto'}}>
                                    When you run lotteries, you should have to respect your country laws. Most of the
                                    time, you have to publish contest rules in strict conditions. Refer to your
                                    authorities. Clic&Gain is not responsible for eventual law infrigements.</p>
                            </Col>
                        </Row>
                    </Alert>

                    <div>
                        <Row>
                            <Col sm={4}>
                                <Button style={{width: "100%", height: '100%'}} className={'launchButton greenBtn'}>
                                    <span>Save as test</span>
                                </Button>
                            </Col>
                            <Col sm={{size: 7, offset: 1}}>
                                <Button style={{width: "100%", height: '100%'}} className={'launchButton purple'}>
                                    <span>Launch your fun bot</span>
                                    <SwitchButton color={"#e4b7ea"} style={{margin: '1em auto'}}><span
                                        style={{fontSize: "large"}}>No watermark</span></SwitchButton>
                                </Button>
                            </Col>
                        </Row>
                        <div className={"separatorBtnTxt"}/>
                        <Row>
                            <Col sm={4}>
                                <p>As the developer or your bot, you can test it by sending messages and adjust your
                                    settings.</p>
                            </Col>
                            <Col sm={{size: 7, offset: 1}}>
                                <p>
                                    When you decide that your bot is ready to go live, click here. Once done, <b>you
                                    will not able to edit your bot</b>. However, you can delete it in your dashboard
                                    home page and create another one.
                                </p>
                            </Col>
                        </Row>
                    </div>

                    <div style={{display: 'flex', flexFlow: "row nowrap"}}>
                        <Link to={{pathname: `step3`, state: {prefill: this.state.prefill}}}>
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

class PrizeSection extends Component {
    static propTypes = {
        prizes: PropTypes.arrayOf(PropTypes.object),
        edit: PropTypes.func.isRequired,
        add: PropTypes.func.isRequired
    };

    renderPrizeList() {
        let render = [];
        if (this.props.prizes)
            for (let i in this.props.prizes) {
                render.push(<PrizeEntry handler={(event) => this.props.edit(event, i)} prize={this.props.prizes[i]}
                                        key={i}/>);
            }
        return render;
    }

    render() {
        return (
            <div>
                <h2 style={{color: "#686868"}}>Prizes</h2>
                {this.renderPrizeList()}
                <PrizeEntry handler={this.props.add}/>
            </div>
        )
    }
}

//TODO if prize filled rework ergonomy
class PrizeEntry extends Component {
    propTypes = {prize: PropTypes.object, handler: PropTypes.func.isRequired};
    defaultProps = {prize: null};

    render() {
        let prefill = {name: null, description: null, quantity: 0};
        if (this.props.prize) {
            prefill = Object.assign(prefill, this.props.prize);
        }
        return (
            <div style={{marginBottom: '2rem'}}>
                <Form onSubmit={this.props.handler}>
                    <Row form>
                        <Col sm={6} md={4}>
                            <FormGroup>
                                <Label for={"lotName"}>Name *</Label>
                                <Input id={"lotName"} name={"lotName"} required style={{height: '4em'}}
                                       defaultValue={prefill.name}/>
                            </FormGroup>
                        </Col>
                        <Col sm={6} md={4}>
                            <FormGroup>
                                <Label for={"lotDescription"}>Short description *</Label>
                                <Input type="textarea" id={"lotDescription"} name={"lotDescription"} required
                                       style={{height: '4em', resize: 'none'}}
                                       defaultValue={prefill.description}
                                       placeholder={"You can re-use this field as the variable [shortdescription] in the prize win message"}/>
                            </FormGroup>
                        </Col>
                        <Col sm={6} md={2} lg={1}>
                            <FormGroup>
                                <Label for={"lotQuantity"}>Quantity *</Label>
                                <Input type="number" id={"lotQuantity"} name={"lotQuantity"} required
                                       style={{height: '4em'}}
                                       defaultValue={prefill.quantity}/>
                            </FormGroup>
                        </Col>
                        <Col sm={12} md={2}>
                            <Row style={{height: '100%', margin: 'auto'}}>
                                <div className="flexbox" style={{flexDirection: 'row-reverse'}}>
                                    <Col sm={12} md={6} className={"flexbox vcenter hcenter"}>
                                        {this.props.prize ?
                                            <Button style={{margin: 'auto'}} className={"greenBtn roundBtn small"}><Icon
                                                path={mdiPen}
                                                size={1}/></Button>
                                            :
                                            <Button style={{margin: 'auto'}}
                                                    className={"greenBtn roundBtn"}><Icon path={mdiPlus}
                                                                                          size={1}/></Button>
                                        }
                                    </Col>
                                    <Col sm={12} md={6} className={"flexbox vcenter hcenter"}>
                                        <Button style={{margin: 'auto'}} onClick={() => console.log("Hey, Image upload !")}
                                                className={"roundBtn small"}
                                                type="button">
                                            <Icon path={mdiImagePlus}
                                                  size={1}/>
                                        </Button>
                                    </Col>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

class PrizeWinMessage extends Field {
    render() {
        return (
            <FormGroup>
                <Label for={'prizeWinMessage'}>Prize win message</Label>
                <Input type='textarea' id={'prizeWinMessage'} name={'prizeWinMessage'}
                       onChange={this.props.onChange}
                       value={this.props.value}
                       placeholder={"At the end date of the sweepstake, a draw will be automatically run on our servers and winners will receive this message."}/>
            </FormGroup>
        );
    }
}
