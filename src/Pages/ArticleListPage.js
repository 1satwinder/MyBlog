import React from 'react';
import articleContent from './article-content';
import ArticleList from '../Components/ArticleList';

const ArticleListPage = () => (
    <>
    <h1>Articles</h1>
    <ArticleList articles={articleContent}></ArticleList>
    </>
);

export default ArticleListPage;