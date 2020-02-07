import React, { Component } from 'react';
import axios from "axios";
import './static/users.css'
import Form from './form'

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            name: " ",
            comment: " ",
            name_not_empty: true,
            comment_not_empty: true

        };
        this.LoadUsers = this.LoadUsers.bind(this);
    }
    async LoadUsers() {
        const promise = await axios.get("http://localhost:5000/api/users");
        const status = promise.status;
        if (status === 200) {

            this.setState({ users: promise.data });
        }
        else {
            console.log(status)
        }
    }
    componentDidMount() {
        this.LoadUsers();
    }

    /*handleChange_name(event) {
        this.setState({ name: event.target.value });
    }
    handleChange_comment(event) {
        this.setState({ comment: event.target.value });

    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.name === " ")
            this.setState({ name_not_empty: false });
        else
            this.setState({ name_not_empty: true });

        if (this.state.comment === " ")
            this.setState({ comment_not_empty: false });
        else
            this.setState({ comment_not_empty: true });
        if (this.state.comment !== " " && this.state.name !== " ") {
            this.setState({ comment: " " });
            this.setState({ name: " " });
            const promise = await axios.post("http://127.0.0.1:5000/api/post_comment", { user: this.state.name, comment: this.state.comment });
            const status = promise.status;
            if (status === 200) {
                this.LoadUsers();
            }
        }

    }*/

    render() {
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
                <Form/>
                </div>
            </div >
        );
    }
}

export default Users;
