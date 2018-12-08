import React from "react";
import "../styles/bigRoundButton.css"
import {Button} from "reactstrap";

export default function BigButton(props) {
    console.log(props);
    const {className, ...nProps} = props;
    return (
        <Button className={"bigRoundBtn " + (className ? className : "")} {...nProps}>
            {props.children}
        </Button>
    )
}