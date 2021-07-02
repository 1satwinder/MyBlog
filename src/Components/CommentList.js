import React from 'react'

function CommentList({ comments }) {
    return (
        <>
        <h3>Comments</h3>
            {
                comments.map( (comment, index) => (
                    <div className="comment" key={index}>
                        <h4>{comment.username}</h4>
                        <p>{comment.text}</p>
                    </div>
                ) )
            }
        </>
    )
}

export default CommentList
