import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormGroup, Label, Input, Row, Col} from "reactstrap";
import {Icon} from '@mdi/react'
import {mdiFacebookMessenger, mdiTwitter, mdiEmail} from '@mdi/js'

export default class Summary extends Component {
    static propTypes = {prefill: PropTypes.any.isRequired, fields: PropTypes.arrayOf(PropTypes.string)}
    static defaultProps = {fields: []};

    render() {
        let firstPart = this.props.fields.includes("name") || this.props.fields.includes("channels");
        if (this.props.fields.length > 0) {
            return (
                <Row>
                    {firstPart && <Col sm={12} lg={6}>
                        <Row>
                            <Col sm={6}>
                                {this.props.fields.includes("name") && <BotNameSummary value={this.props.prefill.botName}/>}
                            </Col>
                            <Col sm={6}>
                                {this.props.fields.includes("channels") && <ChannelsSummary value={this.props.prefill.channels}/>}
                            </Col>
                        </Row>
                    </Col>}
                    <Col sm={12} lg={(firstPart) ? 6 : 12}>
                        <Row>
                            <Col sm={6}>
                                {this.props.fields.includes("game") && <SummaryGame value={this.props.prefill.game}/>}
                            </Col>
                            <Col sm={6}>
                                {this.props.fields.includes("status") && <SummaryStatus/>}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
        else return (null);
    }
}

class SummaryComponent extends Component {
    static propTypes = {value: PropTypes.any}
}

export class SummaryGame extends SummaryComponent {
    render() {
        return (
            <FormGroup>
                <Label for="gameSummary">Experience</Label>
                <Input className={"informative_field"} type="select" name="gameSummary" disabled
                       defaultValue={this.props.value}>
                    <option value={"sweepstake"}>Sweepstake</option>
                    <option value={"instantwin"}>Instant win</option>
                    <option value={"race"}>Race</option>
                </Input>
            </FormGroup>
        );
    }
}

export class SummaryStatus extends SummaryComponent {
    static defaultProps = {value: 1};

    render() {
        return (
            <FormGroup>
                <Label for="statusSummary">Status</Label>
                <Input className={"informative_field"} type="select" name="statusSummary" disabled
                       defaultValue={this.props.value}>
                    <option value={1}>Test</option>
                    <option value={2}>Active</option>
                    <option value={3}>Finished</option>
                    <option value={4}>Cancelled</option>
                </Input>
            </FormGroup>
        );
    }
}

export class BotNameSummary extends SummaryComponent {
    render() {
        return (<FormGroup>
            <Label for="botNameSummary">Name</Label>
            <Input name="botNameSummary" disabled className={"informative_field"}
                   defaultValue={this.props.value}>
            </Input>
        </FormGroup>)
    }
}

export class ChannelsSummary extends SummaryComponent {
    static propTypes = {value: PropTypes.arrayOf(PropTypes.string).isRequired};
    static defaultProps = {value: []};

    render() {
        return (<FormGroup>
            <Label for="botNameSummary">Channels</Label>
            <div style={{flexGrow: '1'}}>
                {this.props.value['messenger'] && <Icon path={mdiFacebookMessenger} size={1.5} color={"#0084FF"}/>}
                {this.props.value['twitter'] && <Icon path={mdiTwitter} size={1.5} color={"#38A1F3"}/>}
                {this.props.value['email'] && <Icon path={mdiEmail} size={1.5} color={"#000000"}/>}
            </div>
        </FormGroup>)
    }
}