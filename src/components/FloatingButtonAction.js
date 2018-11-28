import React from 'react';
import {Button} from "reactstrap";
import '../styles/floatingActionButton.css'

export default function FloatingButtonAction(props) {
    let {className, ...nProps} = props;
    return (
        <Button className={"FloatingActionButton " + (className ? className : "")} {...nProps}>
            {props.children}
        </Button>
    )
}