import React from 'react';
import {CommentsContext} from './context'
import './static/comments.css'

export default function Comments_div() {

    return (
        <CommentsContext.Consumer>
            {({ comments, setComments }) => (
                <div>
                    {comments.map(el =>
                        <div className="comment_container" key={el.id}>
                            <p>{el.name}</p>
                            <p>{el.comment}</p>
                        </div>
                    )}
                </div>
            )}
        </CommentsContext.Consumer>
    )
}