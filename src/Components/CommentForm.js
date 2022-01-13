import React from 'react';
import {useState} from 'react';

function CommentForm({articleName, setArticleInfo}) {
    const [userName, setUserName] = useState('');
    const [comment, setComment] = useState('');

    const addComment = async () => {
        const result = await fetch(`/api/articles/${articleName}/add-comment`, { 
            method: 'post',
            body: JSON.stringify({username: userName, text: comment}),
            headers: {
                'Content-Type': 'application/json'
            } 
     });
        const body = await result.json();
        console.log(body);
        setArticleInfo(body);
        setUserName('');
        setComment('');
    }
    return (
        <div className="add-comment-form">
                <label> Name:
                <input type="text" value={userName} onChange={ (event) => setUserName(event.target.value) }/>
                </label>

                <label> Comment:
                <textarea rows="5" cols="30" value={comment} onChange= {event => setComment(event.target.value)} ></textarea>
                </label>
                <button onClick={() => addComment()}>Submit</button>
        </div>
    )
}
export default CommentForm;
