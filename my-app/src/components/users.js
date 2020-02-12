import React, { Component } from 'react';
import './static/users.css'
import Form from './form'
import { GetComments } from './APIfunctions'

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            loading: false,

        };
    }
    async componentDidMount() {
        this.setState({loading: true});
        var data = await GetComments()
        this.setState({users: data});
        this.setState({loading: false});
        
    }

    render() {
        if (this.state.loading === true) {
            return (
            <div className="box1">
                <div className="header">
                    <h2>Visitors comments</h2>
                </div>
                <div className="comments_div">
                    <h3>Loading</h3>
                </div>
                <div className="header">
                    <h2>Leave a comment</h2>
                </div>
                <div className="comments_form">
                    <Form />
                </div>
            </div >
            )
        }
        else {
            return (
                <div className="box1">
                    <div className="header">
                        <h2>Visitors comments</h2>
                    </div>
                    <div className="comments_form">
                        <Form userComs={this.state.users}/>
                    </div>
                </div >
            );
        }
    }
}

export default Users;
