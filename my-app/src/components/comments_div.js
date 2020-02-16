import React, {useContext} from 'react';
import {CommentsContext} from './context'
import './static/comments.css'
import {ThemeContext} from './context'

export default function Comments_div() {
    const theme = useContext(ThemeContext)

    return (
        <CommentsContext.Consumer>
            {({ comments, setComments }) => (
                <div>
                    {comments.map(el =>
                        <div className={"comment_container-"+theme.theme} key={el.id}>
                            <p>{el.name}</p>
                            <p>{el.comment}</p>
                        </div>
                    )}
                </div>
            )}
        </CommentsContext.Consumer>
    )
}