import React from 'react';
import articleContent from './article-content';
import ArticleList from '../Components/ArticleList';
import CommentList from '../Components/CommentList';
import CommentForm from '../Components/CommentForm';
import UpvotesSection from '../Components/UpvotesSection';
import NotFound from './NotFound';
import { useState, useEffect } from 'react';

const ArticlePage = ({match}) => {

    const name = match.params.name;
    const article = articleContent.find(item => item.name === name);
    const [articleInfo, setArticleInfo] = useState({ upvotes:0 , comments:[] });
    
    useEffect(() => {
        const fetchData = async () => {
            console.log(name);
            const requestresult = await fetch(`/api/articles/${name}`);
            const body = await requestresult.json();
            console.log(body);
            setArticleInfo(body);
        }
        fetchData();
    }, [name]);

    if(!article){ return <NotFound></NotFound>}

    const otherArticles = articleContent.filter( item => item.name !== name);

    return (
        <>
        <h1>{article.title}</h1>
        <UpvotesSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />
        <p>upvotes: <span style={ {color:'green'} }>{articleInfo.upvotes}</span> </p>
        {article.content.map( (phrase,key) => (
            <p key={key}>{phrase}</p>
        ))
        }

        {/* comment on the article */}
        <CommentList comments={articleInfo.comments}/>
        <CommentForm articleName={name} setArticleInfo={setArticleInfo}></CommentForm>

        <h3>Other Articles:</h3>
        <ArticleList articles={otherArticles}/>
        </>
    );
}
export default ArticlePage;
