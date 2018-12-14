import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormGroup, Label, Input} from "reactstrap";

class Summary extends Component {
    static propTypes = {value: PropTypes.any}
}

export class SummaryGame extends Summary {
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

export class SummaryStatus extends Summary {
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

export class BotNameSummary extends Summary {
    render() {
        return (<FormGroup>
            <Label for="botNameSummary">Name</Label>
            <Input name="botNameSummary" disabled className={"informative_field"}
                   defaultValue={this.props.value}>
            </Input>
        </FormGroup>)
    }
}