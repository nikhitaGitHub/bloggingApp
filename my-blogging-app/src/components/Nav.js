import NavBar from '../UI/NavBar.style.js'
import React from 'react';
import {useContext} from 'react'
import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router-dom';

const Nav = function () {
    //This is user context storing user login information  
    const authCtx = useContext(AuthContext);
    //Navigator to navigate a user to another page
    const navigate = useNavigate();

    //Function to log a user out
    const signoutUser = () => {
        authCtx.logout()
        navigate('/')
    }

    //JSX for the header navigation
    return (
    <React.Fragment>
        <NavBar> 
            <ul>
                <li className="nav-item">
                    <a className="nav-link" href="home">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="view-blogs">My Blogs</a>
                </li>
                <li style={{float:"right"}} className="nav-item">
                    <button className="nav-link-btn" href="#" onClick={signoutUser}>LogOut</button>
                </li>
            </ul>
        </NavBar>
    </React.Fragment>
    )
}

export default Nav;