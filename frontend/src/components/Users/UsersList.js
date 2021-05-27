import Popup from './Popup';
import React, { Component } from 'react';
import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = { users: [], sortedUsers: [], sortName: true, temp:localStorage.getItem('user_id') };
    }

    componentDidMount() {
        axios.post('http://localhost:4000/user/userfind',{id:localStorage.getItem('user_id')})
            .then(response => {
                console.log(response)
                this.setState({ users: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
            console.log(this.state.temp)
    }           



    deleteuser(id) {
        axios.post('http://localhost:4000/user/user/delete', { 'id': id })
            .then(response => {
                console.log(response.data)
            });
        this.setState({
            listings: this.state.listings.filter(el => el._id !== id)
        })
    }

    deleteuser = this.deleteuser;

    deleteDetailaddress(){
        axios.post('http://localhost:4000/user/user/deleteaddress', { 'id': localStorage.getItem('user_id') })
            .then(response => {
                window.location.reload()
                console.log(response.data)
            });

    }

    deleteDetailemail(){
        axios.post('http://localhost:4000/user/user/deleteemail', { 'id': localStorage.getItem('user_id') })
        .then(response => {
            window.location.reload()
            console.log(response.data)
        });

    }

    deleteDetailname(){
        axios.post('http://localhost:4000/user/user/deletename', { 'id': localStorage.getItem('user_id') })
            .then(response => {
                window.location.reload()
                console.log(response.data)
            });

    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Detail Type</th>
                            <th>Value</th>
                            <th>Edit</th>

                            <th></th>
                            
                        </tr>
                    </thead>
                    <tbody>                   
                    <tr>
                    
                       <td>{"(1)"}</td>
                       <td>{"Username"}</td> 
                       <td>{this.state.users.name}</td> 
                       <td> <Button variant="danger" onClick={() => {this.deleteDetailname() }}>Delete</Button></td>
                       <td> <Button variant="danger" onClick={() => { this.setState({ modal_edit_show: true }) }}>Edit</Button></td>
                            <Popup
                                onHide={this.modal_hide}
                                show={this.state.modal_edit_show}

                                curr_id="1"
                            ></Popup>
                    </tr>        
                    
                    <tr>
                       <td>{"(2)"}</td>
                       <td>{"Email"}</td> 
                       <td>{this.state.users.email}</td> 
                       <td> <Button variant="danger" onClick={() => {this.deleteDetailemail() }}>Delete</Button></td>
                       <td> <Button variant="danger" onClick={() => { this.setState({ modal_edit_show: true }) }}>Edit</Button></td>
                            <Popup
                                onHide={this.modal_hide}
                                show={this.state.modal_edit_show}

                                curr_id="1"
                            ></Popup>
                    </tr>        
                    
                    <tr>
                       <td>{"(3)"}</td>
                       <td>{"Address"}</td> 
                       <td>{this.state.users.Address}</td> 
                       <td> <Button variant="danger" onClick={() => {this.deleteDetailaddress() }}>Delete</Button></td>
                       <td> <Button variant="danger" onClick={() => { this.setState({ modal_edit_show: true }) }}>Edit</Button></td>
                            <Popup
                                onHide={this.modal_hide}
                                show={this.state.modal_edit_show}

                                curr_id="1"
                            ></Popup>
                    </tr>        
              
                    </tbody>
                </table>
            </div>
        )
    }
}