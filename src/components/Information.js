import React from 'react';
import CollapsibleTitle from "./CollapsibleTitle";
import {Icon} from '@mdi/react'
import {mdiInformationOutline} from '@mdi/js'

export default function Information(props) {
    return (
        <div id={"information"} style={{display: 'inline-block'}}>
            <div style={{width: '50%', marginLeft: '.5em'}}>
                <CollapsibleTitle
                    title={<h6 style={{opacity: "0.7", margin: "0"}}><Icon style={{marginRight: "1em"}}
                                                                           path={mdiInformationOutline} size={1}
                                                                           color={"#999"}/>{!props.hideText && <span>Informations</span>}</h6>}
                    separator={false} icon={null}>
                    <div style={{margin: "0 .5em 0 .5em", opacity: '.5'}}>{props.children}</div>
                </CollapsibleTitle>
            </div>
        </div>
    );
}