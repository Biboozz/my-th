import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Separator from "../../components/separator";

import "../../styles/features.css"

export default class FeatureGeneric extends Component {
    render() {
        let content = [];
        if (this.props.features) {
            for (const [i, value] of this.props.features.entries()) {
                content.push(<FeatureEntry feature={value} key={i}/>)
                if (i < this.props.features.length - 1) {
                    content.push(<Separator key={`${i}s`}/>)
                }
            }
        }

        return (
            <div className={"featureWrapper"}>
                {this.props.children}
                <div className={"featureContent"}>
                <ul className={"features"}>
                    {content}
                </ul>
            </div>
            </div>
        );
    }
}

export function FeatureEntry(props) {
    return <li>{props.feature}</li>
}

FeatureEntry.propTypes = {feature: PropTypes.node.isRequired};

FeatureGeneric.propTypes = {features: PropTypes.arrayOf(PropTypes.string)};