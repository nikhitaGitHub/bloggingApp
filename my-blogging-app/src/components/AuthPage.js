import {useRef, useState, useContext} from 'react'
import React from 'react'
import FormControl from '../UI/AuthPage.style.js'
import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AuthPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const emailRef = useRef();
    const passwordRef = useRef();
    const authCtx = useContext(AuthContext);
    const [msg, setMsg] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    //Close the modal
    const handleCancel =() => {
        setOpen(false)
    }

    //Allows user to sing up or register 
    const signUpHandler = (event) => {
        //Firebase url for sing up
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCblHt-fHP--1m_kIEZWvtyQ9BDgqP0GP4'
        submitHandler(event, url, 1)
    }

    //Allows user to log into their account
    const logInHandler = (event) => {
        //Firebase url for login
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCblHt-fHP--1m_kIEZWvtyQ9BDgqP0GP4'
        submitHandler(event, url, 0)
    }

    //Allows user to submut registeration form and show appropriate message
    const submitHandler = (event, url, flag) => {
        event.preventDefault();
        //flag 1 is to handle new user sing up case
        if(flag === 1) {
            setMsg("Creating Account")
        }
        //flag 0 is to handle log in case
        else {
            setMsg("Logging In")
        }
        setIsLoading(true)
        //Refs to capture user input 
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

        // store email and password in DB or verify it for login
        fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type' : 'application/json'
                }
            }).then(res => {
                setIsLoading(false)
                if(res.ok) {
                    console.log(flag)
                    if(flag === 1) {
                        setOpen(true)
                    }
                    else {
                        console.log("Logging in ")
                        navigate('/home')
                    }
                    
                    return res.json();
                }
                //Error handling for incorrect user login
                else {
                    res.json().then(data=> {
                        let errMsg = 'Authentication failed!';
                        if(data && data.error && data.error.message)
                            errMsg = data.error.message
                        alert(errMsg)
                        throw new Error(errMsg);
                    });
                }
            })
            //Finally handle the success case or error case
            .then((data) => {
                if(flag === 0) {
                    if (data === undefined) {
                        authCtx.login('')
                    }
                    else {
                        //For auto logout of user
                        let expTime = new Date(new Date().getTime() + (+data.expiresIn * 1000))
                        authCtx.login(data.idToken, expTime, data.localId);
                    }
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
        }
        // JSX to render sing up and login form 
    return (
        <React.Fragment>
            <FormControl >
                <label>Email</label>
                <input required ref={emailRef} placeholder="dummy@email.com" type="email" />
                <label>Password</label>
                <input ref={passwordRef} required type="password"/>
                {!isLoading && <input className="primary" onClick={signUpHandler} type="button" value="Sign Up"/>}
                {!isLoading && <input onClick={logInHandler} type="button" value="Log In"/>}
                {isLoading && <p> {msg} ... !</p>}
            </FormControl>
            <Modal style={{marginTop: "16%", textAlign:"center"}} show={open} onHide={handleCancel}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <p>Your account is successfully created. You may now login into your account.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCancel} variant="primary">OK</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
} 

export default AuthPage;