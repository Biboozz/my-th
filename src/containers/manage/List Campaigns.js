import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {Icon} from '@mdi/react'
import {mdiAlert, mdiEmail, mdiFacebookMessenger, mdiPen, mdiTrashCan, mdiTwitter} from '@mdi/js'

import Campaign, {InterfaceTypes} from "../../classes/Campaign";

import "../../styles/ListCampaigns.css"
import {Link} from "react-router-dom";

class ListCampaigns extends Component {
    render() {
        return (
            <div>
                <Table>
                    <thead>
                    <tr>
                        <th>Fun Bots</th>
                        <th>Status</th>
                        <th>Channel</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th># Interactions</th>
                        <th>Unique users</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.list.slice(0,3).map(c => <ListTableEntry campaign={c} key={c.id}/>)}
                    </tbody>
                </Table>
            </div>
        );
    }
}

ListCampaigns.propTypes = {list: PropTypes.arrayOf(PropTypes.instanceOf(Campaign))};

class ListTableEntry extends Component {

    constructor(props) {
        super(props);
        let c = this.props.campaign;
        let icons = c.interfaceSettings.map((inter, i) => {
            let color;
            let icon;
            switch (inter.typeValue) {
                case InterfaceTypes.FACEBOOK.value:
                    color = "#0084ff";
                    icon = mdiFacebookMessenger;
                    break;
                case InterfaceTypes.TWITTER.value:
                    color = "#00b2ff";
                    icon = mdiTwitter;
                    break;
                case InterfaceTypes.EMAIL.value:
                    color = "#000000";
                    icon = mdiEmail;
                    break;
                default:
                    color = "#ab2337";
                    icon = mdiAlert;
            }
            return <Icon path={icon} color={color} size={1} key={i}/>
        });

        this.state = {
            icons: icons,
            deleteModal: false,
            fieldDelete: null
        }
    }

    toggleDeleteModal = () => {
        this.setState({
            deleteModal: !this.state.deleteModal
        })
    };

    deleteFieldChange = (event) => {
        this.setState({fieldDelete: event.target.value})
    };

    deleteCampaign = (campaign) => {
        console.log("Campain deletion: ", campaign)
    };

    render() {
        let c = this.props.campaign;
        if (c)
            return (
                <tr>
                    <th scope="row">{c.name}</th>
                    <td>{c.status}</td>
                    <td>{this.state.icons}</td>
                    <td>{c.start.format('L')}</td>
                    <td>{c.end.format('L')}</td>
                    <td>TODO</td>
                    <td>TODO</td>
                    <td>{c.gameSettings.typeName}</td>
                    <td><Link to={`/manage/${c.id}`}><Button className={"greenBtn roundBtn small"} style={{margin:"auto .2rem"}}><Icon path={mdiPen} color={"#ffffff"}
                                                                                     size={1}/></Button></Link>
                    <Button outline onClick={this.toggleDeleteModal} className={"roundBtn small"} style={{margin:"auto .2rem"}}><Icon path={mdiTrashCan}
                                                                                                color={"#ffffff"}
                                                                                                size={1}/></Button>
                    </td>
                    <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
                            <ModalHeader toggle={this.toggleDeleteModal}>You cannot undo this action</ModalHeader>
                            <ModalBody>
                                {/*TODO: Make text*/}
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt
                                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                    ullamco
                                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in
                                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                    laborum.
                                </p>
                                <p><b>
                                    Enter your campaign name to validate deletion:
                                </b></p>
                                <FormGroup>
                                    <Input onChange={this.deleteFieldChange} invalid={this.state.fieldDelete !== c.name} valid={this.state.fieldDelete === c.name}/>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={this.deleteCampaign(c)}
                                        disabled={this.state.fieldDelete !== c.name}>Delete</Button>
                                <Button color="secondary" onClick={this.toggleDeleteModal}>Cancel</Button>
                            </ModalFooter>
                    </Modal>
                </tr>
            );
    }
}

ListTableEntry.propTypes = {campaign: PropTypes.instanceOf(Campaign)};

export default ListCampaigns;