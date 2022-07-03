import './App.css';
import AuthContext from './store/auth-context';
import AuthPage from './components/AuthPage.js';
import Home from './components/Home.js';
import PostedBlog from './components/PostedBlog.js';
import MyBlogs from './components/MyBlogs.js';
import CreateBlog from './components/CreateBlog.js';
import { Routes, Route} from 'react-router-dom';
import { useContext} from 'react';

function App() {
  const authCtx = useContext(AuthContext);
 
  return (
    <Routes>
        {!authCtx["isLoggedIn"] && (<Route 
        path='/' 
        element= {<AuthPage />} />
        )}
        {authCtx["isLoggedIn"] && (<Route
        path='/'
        element={<Home/>}/>
        )}
        {authCtx["isLoggedIn"] && (<Route
        path='home'
        element={<Home/>}/>
        )}
        {authCtx["isLoggedIn"] && (<Route
        path='postedBlog'
        element={<PostedBlog/>}/>)}
        {authCtx["isLoggedIn"] && (<Route
        path='create-blog'
        element={<CreateBlog/>}/>)}
        {authCtx["isLoggedIn"] && (<Route
        path='view-blogs'
        element={<MyBlogs/>}/>)}
    </Routes>
  );
}

export default App;
