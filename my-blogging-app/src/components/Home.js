import {useState, useEffect} from 'react'
import React from 'react'
import HomeStyle from '../UI/Home.style.js';
import Nav from './Nav.js'
import PostedBlog from './PostedBlog.js'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Home = () => {
    //Variable to hold actual data
    const [values, setValues] = useState({})
    //Navigator to handle button click request of creating a new blog
    const navigate = useNavigate();

    const createBlog = () => {
        navigate('/create-blog')
    }

    //On every time we land on the home page, start fetching data 
    useEffect(() => {
        fetchData();
    },[]);

    //Fetches data for all users 
    const fetchData = async () => {
        //GET request by default 
        const resp = await fetch(`https://assignment-c3557-default-rtdb.asia-southeast1.firebasedatabase.app/blogs.json?orderBy="createdAt"`)
        const data = await resp.json()
        if(!resp.ok) {
            const err = new Error("Unexpected Status:" + resp.status)
            err.data = data;
            err.resp = resp;
            throw err;
        }
        else { 
            //Store all user data and display by the newest post first
            setValues(data)
        }
    }
    //JSX to display already created and posted blogs and not saved blogs
    return (
    <React.Fragment>
        <Nav/>
        <Button style={{pointer:"cursor", float: 'right', marginRight: "12%", marginTop: "2%"}} onClick={createBlog} variant="primary">Create New Post</Button>
         <HomeStyle>
            {
            values !== null 
            ?
            Object.keys(values).map((key, index) =>
                { return Object.keys(values[key]).map((k, idx) => 
                    (<PostedBlog key={index+''+idx} item={values[key][k] } home={true} uid={k} userId={key}/>)
            )})
            : <p style={{textAlign: "center", marginTop:'15%'}}>Nodody created any blogs yet! Be the first one.</p>
            }
        </HomeStyle>
    </React.Fragment>
    )
}

export default Home