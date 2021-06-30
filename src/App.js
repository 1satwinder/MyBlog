import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage';
import ArticleListPage from './Pages/ArticleListPage';
import ArticlePage from './Pages/ArticlePage';
import NavBar from './Components/NavBar';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <Router>
       <div className="App">
         <NavBar></NavBar>
         <div id="page-body">
           <Switch>
            <Route path="/" component={HomePage} exact/>
            <Route path="/about" component={AboutPage} />
            <Route path="/articles-list" component={ArticleListPage} />
            <Route path="/article/:name" component={ArticlePage} />
            <Route component={NotFound} />
           </Switch>
         </div>
       </div>
    </Router>
  );
}

export default App;
