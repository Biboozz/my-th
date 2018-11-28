import React, {Component} from 'react';
import FeatureGeneric from "./featureGeneric";

import "../../styles/features.css"
import "../../styles/bigRoundButton.css"
import BigButton from "../../components/bigButton";
import {Link} from "react-router-dom";

export class FeatureFree extends Component {
    render() {
        return (
            <div>
                <FeatureGeneric
                    features={["1 project", "1 channel - Messenger", "2 experiences", "Watermark", "Basic Analytics"]}>
                    <div style={{textAlign: 'center'}}>
                        <h2 className={"title"}>Test</h2>
                        <span className={"emphasis featureSubtitle"}><span>Free</span></span>
                    </div>
                </FeatureGeneric>
                <Link to={"/login"}><BigButton className={"featureButton"}><span
                    className={"buttonText"}>Start</span></BigButton></Link>
            </div>
        );
    }
}

export class FeatureWatermark extends Component {
    render() {
        return (
            <div>
                <FeatureGeneric
                    features={["1 project", "1 channel - Messenger", "2 experiences", "No Watermark", "Basic Analytics"]}>
                    <div style={{textAlign: 'center'}}>
                        <h2 className={"title"}>No watermark</h2>
                        <div>
                            <div className={"featureSubtitle"}>
                                <div className={"flex"}>
                                <div style={{alignSelf: "flex-start"}}>
                                    <span className={"title"} style={{fontWeight: "1000"}}>excl tax</span>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <span className={"title"} style={{alignSelf: "flex-start"}}>€</span>
                                    <span className={"emphasis"} style={{lineHeight: "1em"}}>99</span>
                                    <span className={"title"} style={{alignSelf: "flex-end"}}>fee</span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FeatureGeneric>
                <BigButton className={"featureButton"}><span className={"buttonText"}>Buy Now</span></BigButton>
            </div>
        );
    }
}

export class FeatureBuisness extends Component {
    render() {
        return (
            <div>
                <FeatureGeneric
                    features={[
                        "On demand projects",
                        "More channels - Messenger, Email, Twitter",
                        "More experiences",
                        "No Watermark",
                        "Enriched Analytics",
                        "Scenario support",
                        "Images validation",
                        "Legal documents (contest rules, notary registration in France)",
                        "..."]}>
                    <div style={{textAlign: 'center', display: 'block'}}>
                        <h2 className={"title"}>Buisness</h2>
                            <span className={"title darker"} style={{fontSize: "x-large", lineHeight: '10rem'}}>Flat rate or subscription</span>
                    </div>
                </FeatureGeneric>
                <BigButton className={"featureButton"}><span className={"buttonText"}>Contact us</span></BigButton>
            </div>)
    }
}