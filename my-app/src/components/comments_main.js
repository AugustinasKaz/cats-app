import React, { Component } from 'react';
import './static/comments.css'
import Form from './form'
import Comments_div from './comments_div'
import { GetComments } from './APIfunctions'
import {CommentsContext} from './context'

class Comments extends Component {
    constructor() {
        super();
        this.state = {
            comments: [],
            setComments: this.ReloadComments,
            loading: false,
        };
    }

    ReloadComments = async () => {
        this.setState({ comments: await GetComments() });
    }

    
    async componentDidMount() {
        this.setState({ loading: true });
        this.setState({ comments: await GetComments() });
        this.setState({ loading: false });

    }

    render() {
        if (this.state.loading === true) {
            return (
                <CommentsContext.Provider value={this.state}>
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
                </CommentsContext.Provider>
            )
        }
        else {
            return (
                <CommentsContext.Provider value={this.state}>
                    <div className="box1">
                        <div className="header">
                            <h2>Visitors comments</h2>
                        </div>
                        <div className="comments_div">
                            <Comments_div />
                        </div>
                        <div className="header">
                            <h2>Leave a comment</h2>
                        </div>
                        <div className="comments_form">
                            <Form />
                        </div>
                    </div >
                </CommentsContext.Provider>
            )
        }
    }
}

export default Comments;
