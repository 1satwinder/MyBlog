import React from 'react'

function UpvotesSection({articleName, upvotes, setArticleInfo}) {

    const upvoteArticle = async () => {
        const result = await fetch(`/api/articles/${articleName}/upvotes`, { method: 'post'});
        const body = await result.json();
        console.log(body);
        setArticleInfo(body);
    }
    return (
        <div>
            <button onClick={upvoteArticle}>Upvote</button>
            <p>This article have {upvotes}</p>
            
        </div>
    )
}

export default UpvotesSection;
