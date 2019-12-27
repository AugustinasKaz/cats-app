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
            name_not_empty: true,
            comment_not_empty: true

        };
        this.LoadUsers = this.LoadUsers.bind(this);
        this.handleChange_name = this.handleChange_name.bind(this);
        this.handleChange_comment = this.handleChange_comment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async LoadUsers() {
        const promise = await axios.get("/api/users");
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
            const promise = await axios.post("api/post_comment", { user: this.state.name, comment: this.state.comment });
            const status = promise.status;
            if (status === 200) {
                this.LoadUsers();
            }
        }

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
                    <h2>Leave a comment</h2>
                    <label>
                        Name:
                        <br />
                        <input type="text" value={this.state.name} onChange={this.handleChange_name}
                            className={this.state.name_not_empty ? "input_good" : "input_bad"} />
                    </label>
                    <br />
                    <label>
                        Comment:
                        <br />
                        <input type="text" value={this.state.comment} onChange={this.handleChange_comment}
                            className={this.state.comment_not_empty ? "input_good" : "input_bad"} />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div >
        );
    }
}

export default Users;
