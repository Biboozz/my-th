import {Component} from 'react';
import PropTypes from 'prop-types';

export default class Field extends Component {
    static propTypes = {onChange: PropTypes.func, value: PropTypes.any};
    static defaultProps = {
        onChange: () => {
        },
        value: null
    };
}
