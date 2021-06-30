import React from 'react';
import articleContent from './article-content';
import ArticleList from '../Components/ArticleList';
import NotFound from './NotFound';


const ArticlePage = ({match}) => {

    const name = match.params.name;
    console.log(name);
    console.log(match);
    const article = articleContent.find(item => item.name === name);

    if(!article){ return <NotFound></NotFound>}

    const otherArticles = articleContent.filter( item => item.name !== name);
    console.log(otherArticles);
    return (
        <>
        <h1>{article.title}</h1>
        {article.content.map( (phrase,key) => (
            <p key={key}>{phrase}</p>
        ))
        }

        <h3>Other Articles:</h3>
        <ArticleList articles={otherArticles}/>
        </>
    );
}
export default ArticlePage;