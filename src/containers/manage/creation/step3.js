import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {stateToUserProps} from "../../../reducers/user";
import {getAuthResponse, getPagePicture, getPermissions, getUserPages} from "../../../facebookUtilities";
import {Col, Input, FormGroup, Label, Row, Form, Button} from "reactstrap";
import ImageLoader from "react-load-image";
import Spinner from 'react-spinner-material';
import {Icon} from '@mdi/react'
import {mdiRobot, mdiPlusCircle, mdiImage, mdiSkipPrevious, mdiSkipNext} from '@mdi/js'

import '../../../styles/campaignCreation/step3.css'
import '../../../styles/separator.css'
import '../../../styles/utils.css'

import BigButton from "../../../components/bigButton";
import {Link} from "react-router-dom";
import produce from "immer";

const testAssociation = [
    {name: "Test1", cover: "https://picsum.photos/500/500/?image=1063", id: "idTest1"},
    {name: "Test2", cover: "https://picsum.photos/500/500/?image=598", id: "idTest2"}];

class CampaignCreationStep3 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startedloading: false,
            readyToRender: false,
            fetchedPages: 0,
            prefill: props.location.state.prefill,
            loadingMessage: "Init",
            associationList: null
        }
    }


    updateMessage(message) {
        this.setState({loadingMessage: message});
    }

    toggleRender(bool = !this.state.readyToRender) {
        this.setState({readyToRender: bool});
    }

    loadingPages = async () => {
        this.setState({startedLoading: true});
        this.updateMessage("Getting authResponse");
        getAuthResponse().then(authResponse => {
            this.updateMessage("Getting permissions");
            getPermissions(this.props.user.fbId, authResponse.accessToken).then(permissionResponse => {
                //If we already have the permission to see pages
                if (permissionResponse.data.some((e1) => {
                    return e1.permission === "manage_pages" && e1.status === "granted"
                })) {
                    this.updateMessage("Getting authResponse");
                    //Getting page informations
                    getUserPages(this.props.user.fbId, authResponse.accessToken).then(r => {
                            this.updateMessage("Getting page details...");
                            this.setState({associationList: r.data});

                            for (let i in this.state.associationList) {
                                let assocList = this.state.associationList;
                                getPagePicture(assocList[i].id).then((r) => {
                                    assocList[i].picture = r.data.url;
                                    console.log(r.data.url);
                                    this.setState({fetchedPages: this.state.fetchedPages + 1, associationList: assocList});
                                })
                            }
                            this.setState({readyToRender: true});
                        }
                    )
                } else {
                    //TODO: Ask for manage_pages permission
                }
            });
        })
    };

    //TODO: Remove, testing behaviour
    async componentDidMount() {
        if (!this.state.startedLoading)
            if (window.FB === undefined)
                window.fbLoaded.push(this.loadingPages);
            else
                this.loadingPages();
    }

    updateImageMatchPrefill = (id, event) => {
        this.setState({
            prefill: produce(this.state, (draftPrefill) => {
                if (!draftPrefill.imageMatches[id])
                    draftPrefill.imageMatches = {};
                draftPrefill.imageMatches[id] = event.target.value
            })
        })
    }

    updatePrefill = (event) => {
        this.setState({
            prefill: produce(this.state.prefill, draftPrefill => {
                draftPrefill[event.target.id] = event.target.value;
                console.log(event.target.id, event.target.value);
                console.log(draftPrefill);
            })
        });
    };

    render() {
        let associaitonRender = [];
        if (this.state.associationList && this.state.fetchedPages === this.state.associationList.length) {
            for (let i in this.state.associationList) {
                // noinspection JSUnfilteredForInLoop
                const assoc = this.state.associationList[i];
                associaitonRender.push(
                    <div className={"Association"} key={assoc.id}>
                        <div className={"flexbox hcenter"} style={{width: '100%'}}>
                            <div className={"flexbox vcenter hcenter"}>
                                {/*TODO: prevent XSS throught img -> src*/}
                                <ImageLoader src={`${assoc.picture}`}>
                                    <img alt={`${assoc.name} Cover`} className={"roundImage"}/>
                                    <span>Error loading image</span>
                                    <div className={"flexbox vcenter hcenter"}>
                                        <Spinner
                                            size={25}
                                            spinnerColor={"#ddd"}
                                            spinnerWidth={2}
                                            visible={true}/>
                                    </div>
                                </ImageLoader>
                            </div>
                            <div className={"flexbox vcenter"} style={{flexGrow: 1}}>
                                <span className={"associationName"}> {assoc.name} </span>
                            </div>
                            <div className={"flexbox vcenter hcenter"}>
                                <BigButton className={"greenBtn removeTextOnSmall"}><Icon path={mdiRobot} size={1}
                                                                                          color={"#ffffff"}/><span>Connect bot to page</span></BigButton>
                            </div>
                        </div>
                        <hr className={"hSeparator"}/>
                    </div>)
            }
        }
        return (
            <div style={{marginTop: '2rem'}}>
                {!(this.state.associationList && this.state.fetchedPages === this.state.associationList.length) ?
                    <div style={{
                        display: "flex",
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Spinner
                            size={60}
                            spinnerColor={"#ddd"}
                            spinnerWidth={5}
                            visible={true}/>
                        <br/>
                        <span>{this.state.loadingMessage}</span>
                        {/*<button onClick={this.loadingPages}>TestFB</button>*/}
                    </div>
                    :
                    <div style={{marginBottom: "3em"}}>
                        <h2 style={{color: "#686868"}}>Your facebook pages</h2>
                        {associaitonRender}
                    </div>
                }
                <div>
                    <h2 style={{color: "#686868"}}>You bot messages</h2>
                    <Form>
                        <div style={{marginBottom: '1em'}}>
                            <FormGroup>
                                <Label for={"firstMessage"}>First Message *</Label>
                                <Input type={"textarea"} id={"firstMessage"} name={"firstMessage"} required value={this.state.prefill.firstMessage}
                                       onChange={this.updatePrefill}
                                       placeholder={"Explain to your fans what are the goal and the rule of your experience."}/>
                            </FormGroup>
                            <span>Image with you first message (optional)</span><Icon path={mdiPlusCircle}
                                                                                      size={1} color={"#111111"}
                                                                                      style={{margin: ".5em"}}/>
                        </div>
                        <FormGroup>
                            <Label for={"analysisMessage"}>Analysis message *</Label>
                            <Input type={"textarea"} id={"analysisMessage"} name={"analysisMessage"} required value={this.state.prefill.analysisMessage}
                                   onChange={this.updatePrefill}
                                   placeholder={"It appears every time when a user sent a message."}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for={"nomatchMessage"}>No Match Message</Label>
                            <Input type={"textarea"} id={"nomatchMessage"} name={"nomatchMessage"}
                                   onChange={this.updatePrefill}
                                   placeholder={"It appears every time when a user sent an unknown pic."}/>
                        </FormGroup>
                        <FormGroup>
                            {/*TODO: Recover images from step2*/}
                            <Label for={"matchMessage1"}>Match Message *</Label>
                            <br/>
                            <span><Icon path={mdiImage} size={2} color={"#000000"}/> Image name</span>
                            <Input type={"textarea"} id={"matchMessage1"} name={"matchMessage1"} required
                                   placeholder={"The above image is matched. Send a message relative to this image. For sweepstake experience, do not forget to inform your user that his participation is then validated."}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for={"defaultMessage"}>Default Message</Label>
                            <Input type={"textarea"} id={"defaultMessage"} name={"defaultMessage"} value={this.state.prefill.defaultMessage}
                                   onChange={this.updatePrefill}
                                   placeholder={"It appears every time when the bot doesn't understand the user message. For example, if a user sends some text, the bot will use this default message to answer."}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for={"finalMessage"}>Final Message</Label>
                            <Input type={"textarea"} id={"finalMessage"} name={"finalMessage"} value={this.state.prefill.finalMessage}
                                   onChange={this.updatePrefill}
                                   placeholder={"This message will come just after the Match message. It's dedicated for sharing the experience, a share button will be displayed."}/>
                        </FormGroup>
                        <div>
                            <Link to={{pathname: `step2`, state: {prefill: this.state.prefill}}}>
                                <Button className={"NavigationButton BackButton"}>
                                    Back
                                    <Icon path={mdiSkipPrevious} size={1}/>
                                </Button>
                            </Link>
                            <Button className={"NavigationButton NextButton"}>
                                Next
                                <Icon path={mdiSkipNext} size={1}/>
                            </Button>
                        </div>
                    </Form>

                </div>
            </div>

        );
    }
}

CampaignCreationStep3.propTypes = {};

export default connect(stateToUserProps)(CampaignCreationStep3);