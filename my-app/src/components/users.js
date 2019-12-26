import React, { Component } from 'react';
import axios from "axios";
import './users.css'

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            name: " ",
            comment: " ",
        };
        this.LoadUsers = this.LoadUsers.bind(this);
        this.handleChange_name = this.handleChange_name.bind(this);
        this.handleChange_comment = this.handleChange_comment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleChange_name(event) {
        this.setState({ name: event.target.value });
    }
    handleChange_comment(event) {
        this.setState({ comment: event.target.value });
        
    }

    async handleSubmit() {
            alert("hello");
            
    }

    render() {
        return (
            <div className="box1">
                <h2>Visitors comments</h2>
                <div className="comments">
                    {this.state.users.map(user =>
                        <div className="comment_container" key={user.id}>
                            <p>{user.name}</p>
                            <p>{user.comment}</p>
                        </div>)}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={this.handleChange_name} />
                    </label>
                    <br/>
                    <label>
                        Comment:
                        <input type="text" value={this.state.comment} onChange={this.handleChange_comment} />
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>

            </div>
        );
    }
}

export default Users;
