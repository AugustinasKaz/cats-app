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
            //console.log(this.state.loading, this.state.users)
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
            //console.log(this.state.loading, this.state.users)
            return (
                <div className="box1">
                    <div className="header">
                        <h2>Visitors comments</h2>
                    </div>
                    <div className="comments_div">
                        {this.state.users.map(user =>
                            <div className="comment_container" key={user.id}>
                                <p>{user.name}</p>
                                <p>{user.comment}</p>
                            </div>)}
                    </div>
                    <div className="header">
                        <h2>Leave a comment</h2>
                    </div>
                    <div className="comments_form">
                        <Form />
                    </div>
                </div >
            );
        }
    }
}

export default Users;
