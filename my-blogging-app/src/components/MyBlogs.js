import { useState, useEffect} from 'react'
import React from 'react'
import HomeStyle from '../UI/Home.style.js';
import Nav from './Nav.js'
import PostedBlog from './PostedBlog.js'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


const MyBlogs = () => {
    //Variable to hold actual data
    const [values, setValues] = useState({})
    
    //id to hold the unique user id who is logged in
    const id = localStorage.getItem('uid')
    
    //Navigation to handle button click event for creating new blog post 
    const navigate = useNavigate();
    
    //Every page load, data can change on backend , to fetch upated data, we use this hook
    useEffect(() => {
        fetchData();
    }, []);
    
    //Function to actually handle button click and navigate away
    const createBlog = () => {
        navigate('/create-blog')
    }

    //Function to GET or fetch only blogs by current user posted or unposted
    const fetchData = async () => {
        const resp = await fetch(`https://assignment-c3557-default-rtdb.asia-southeast1.firebasedatabase.app/blogs/${id}.json`)
        const data = await resp.json()
        if(!resp.ok) {
            const err = new Error("Unexpected Status:" + resp.status)
            err.data = data;
            err.resp = resp;
            throw err;
        }
        else {
            setValues(data)
        }
    }
    //JSX to render only the blogs of current user
    return (
    <React.Fragment>
        <Nav/>
        <Button style={{pointer:"cursor", float: 'right', marginRight: "12%", marginTop: "2%"}} onClick={createBlog} variant="primary">Create New Post</Button>
        <HomeStyle>
            { values !== null 
            ?
                Object.keys(values).map((singleData, index) => (
                    <PostedBlog home={false} key={index} item={values[singleData]} uid={singleData}/>
                ))
            :   <p style={{textAlign: "center", marginTop:'15%'}}>You have not posted any blogs yet !</p>
            }
        </HomeStyle>
    </React.Fragment>
    )
}

export default MyBlogs