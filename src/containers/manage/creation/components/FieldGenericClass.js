import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Field extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {onChange: PropTypes.func, value: PropTypes.any};
    static defaultProps = {
        onChange: () => {
        },
        value: null
    };
}
