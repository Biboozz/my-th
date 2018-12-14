import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../styles/switch.css'

class SwitchButton extends Component {
    constructor(props) {
        super(props);

        this.defaultColor = "#ccc";

        this.state = {
            checked: this.props.checked
        }
    }

    render() {
        const {checked, onChange, color, children, style, ...nProps} = this.props;
        return (
            <div style={{display: 'flex', justifyContent: 'center', ...style}} {...nProps}>
                <label className="switch" style={{margin: (children) ? "auto .5em" : "auto"}}>
                    <input type="checkbox" onChange={(event) => {this.setState({checked: event.target.checked}); onChange(event);}} checked={this.state.checked}/>
                    <span className="slider round" style={{background : this.state.checked ? (color) : (this.defaultColor)}}/>
                </label>
                {children}
            </div>
        );
    }
}

SwitchButton.propTypes = {onChange: PropTypes.func, checked: PropTypes.bool, color: PropTypes.string};

SwitchButton.defaultProps = {
    checked: false,
    color: '#2196F3',
    onChange: (event) => {}
};

export default SwitchButton;