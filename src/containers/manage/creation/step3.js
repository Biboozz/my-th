import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {stateToUserProps} from "../../../reducers/user";
import {getAuthResponse, getPagePicture, getPermissions, getUserPages} from "../../../facebookUtilities";
import {Button, Form, FormGroup, Input, Label, Progress} from "reactstrap";
import ImageLoader from "react-load-image";
import Spinner from 'react-spinner-material';
import {Icon} from '@mdi/react'
import {mdiImage, mdiPlusCircle, mdiRobot, mdiSkipNext, mdiSkipPrevious} from '@mdi/js'

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
            loadingBarStatus: {value: 0, message: "Waiting for facebook SDK", color: 'default'},
            associationList: null
        }
    }


    updateBar(valueadd, message = this.state.loadingBarStatus.message, color = this.state.loadingBarStatus.color) {
        console.log('bar length: ', this.state.loadingBarStatus.value + valueadd);
        this.setState({loadingBarStatus: {value: this.state.loadingBarStatus.value + valueadd, message: message, color: color}});
    }

    toggleRender(bool = !this.state.readyToRender) {
        this.setState({readyToRender: bool});
    }

    loadingPages = async () => {
        this.setState({startedLoading: true});
        this.updateBar(20, "Getting login status (this step can be long)");
        getAuthResponse().then(authResponse => {
            this.updateBar(20, "Getting permissions");
            getPermissions(this.props.user.fbId, authResponse.accessToken).then(permissionResponse => {
                //If we already have the permission to see pages
                if (permissionResponse.error) {
                    this.updateBar(0, permissionResponse.error.message, 'danger')
                }
                else if (permissionResponse.data.some((e1) => {
                    return e1.permission === "manage_pages" && e1.status === "granted"
                })) {
                    this.updateBar(20, "Getting pages");
                    //Getting page informations
                    getUserPages(this.props.user.fbId, authResponse.accessToken).then(r => {
                            this.updateBar(20, "Getting pages details");
                            this.setState({associationList: r.data});
                            const barlength = this.state.loadingBarStatus.value;
                            for (let i in this.state.associationList) {
                                let assocList = this.state.associationList;
                                getPagePicture(assocList[i].id).then((r) => {
                                    assocList[i].picture = r.data.url;
                                    console.log(r.data.url);
                                    this.updateBar((100 - barlength) / assocList.length);
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

    updatePrefill = (event) => {
        this.setState({
            prefill: produce(this.state.prefill, draftPrefill => {
                draftPrefill[event.target.id] = event.target.value;
                console.log(event.target.id, event.target.value);
                console.log(draftPrefill);
            })
        });
    };

    connectBot = (page) => {
        console.log(`Connect bot to page: ${page.id}`)
    }

    render() {
        let associaitonRender = [];
        if (this.state.associationList && this.state.fetchedPages === this.state.associationList.length) {
            for (let i in this.state.associationList) {
                // noinspection JSUnfilteredForInLoop
                const page = this.state.associationList[i];
                associaitonRender.push(
                    <div className={"Association"} key={page.id}>
                        <div className={"flexbox hcenter"} style={{width: '100%'}}>
                            <div className={"flexbox vcenter hcenter"}>
                                {/*TODO: prevent XSS throught img -> src*/}
                                <ImageLoader src={`${page.picture}`}>
                                    <img alt={`${page.name} Cover`} className={"roundImage"}/>
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
                                <span className={"associationName"}> {page.name} </span>
                            </div>
                            <div className={"flexbox vcenter hcenter"}>
                                <BigButton className={"greenBtn removeTextOnSmall"}
                                           onClick={() => this.connectBot(page)}><Icon path={mdiRobot} size={1}
                                                                                       color={"#ffffff"}/><span>Connect bot to page</span></BigButton>
                            </div>
                        </div>
                        <hr className={"hSeparator"}/>
                    </div>)
            }
        }
        return (
            <div style={{marginTop: '2rem'}}>
                <h2 style={{color: "#686868"}}>Your facebook pages</h2>
                {!(this.state.associationList && this.state.fetchedPages === this.state.associationList.length) ?
                    <div style={{alignItems: 'center', textAlign: "center"}}>
                        <span style={{margin : 'auto'}}>{this.state.loadingBarStatus.message}</span>
                        <Progress animated={this.state.loadingBarStatus.color != 'danger'} value={this.state.loadingBarStatus.value} color={this.state.loadingBarStatus.color}
                                  style={{margin: "2em auto", width: "50%"}}/>
                    </div>
                    :
                    <div style={{marginBottom: "3em"}}>
                        {associaitonRender}
                    </div>
                }
                <div>
                    <h2 style={{color: "#686868"}}>You bot messages</h2>
                    <Form>
                        <div style={{marginBottom: '1em'}}>
                            <FormGroup>
                                <Label for={"firstMessage"}>First Message *</Label>
                                <Input type={"textarea"} id={"firstMessage"} name={"firstMessage"} required
                                       value={this.state.prefill.firstMessage}
                                       onChange={this.updatePrefill}
                                       placeholder={"Explain to your fans what are the goal and the rule of your experience."}/>
                            </FormGroup>
                            <span>Image with you first message (optional)</span><Icon path={mdiPlusCircle}
                                                                                      size={1} color={"#111111"}
                                                                                      style={{margin: ".5em"}}/>
                        </div>
                        <FormGroup>
                            <Label for={"analysisMessage"}>Analysis message *</Label>
                            <Input type={"textarea"} id={"analysisMessage"} name={"analysisMessage"} required
                                   value={this.state.prefill.analysisMessage}
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
                            <Input type={"textarea"} id={"defaultMessage"} name={"defaultMessage"}
                                   value={this.state.prefill.defaultMessage}
                                   onChange={this.updatePrefill}
                                   placeholder={"It appears every time when the bot doesn't understand the user message. For example, if a user sends some text, the bot will use this default message to answer."}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for={"finalMessage"}>Final Message</Label>
                            <Input type={"textarea"} id={"finalMessage"} name={"finalMessage"}
                                   value={this.state.prefill.finalMessage}
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

export default connect(stateToUserProps)(CampaignCreationStep3);