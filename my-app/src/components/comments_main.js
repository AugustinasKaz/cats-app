import React, { Component } from 'react';
import './static/comments.css'
import Form from './form'
import Comments_div from './comments_div'
import { GetComments } from './APIfunctions'
import { CommentsContext, ThemeContext } from './context'

class Comments extends Component {
    static contextType = ThemeContext
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
        const theme = this.context.theme
        return (
            <CommentsContext.Provider value={this.state}>
                <div className={"box1-" + theme}>
                    <div className="header">
                        <h2>Visitors comments</h2>
                    </div>
                    <div className={"comments_div-" + theme}>
                        {this.state.loading === true ? <h3>Loading</h3> : <Comments_div />}
                    </div>
                    <div className="header">
                        <h2>Leave a comment</h2>
                    </div>
                    <div className={"comments_form-" + theme}>
                        <Form />
                    </div>
                </div >
            </CommentsContext.Provider>
        )
    }
}


export default Comments;