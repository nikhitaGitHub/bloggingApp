import { useRef, useState, useEffect } from 'react'
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import BlogDetails from '../UI/BlogForm.style.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const BlogForm = (props) => {
    const id = localStorage.getItem('uid')
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const [open, setOpen] = useState(false)
    const [posting, setPosting] = useState(false)
    const [saving, setSaving] = useState(false)
    const [modalTxt, setModalTxt] = useState('')
    const [put, setPut] = useState(false)
    const [titleVal, setTitleVal] = useState('')
    const [descrVal, setDescrVal] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    var d = null
    //Function to evalute if a user is coming from my blogs and wanting to edit their already
    //written partial post
    useEffect(() => {
        if(location.state != null) { //location.state holds the data user has already filled in blog
            d = location.state.data
            setTitleVal(d.item.title)
            setDescrVal(d.item.description)
            setName(d.uid) //this is unique blog id
            setPut(true)
        }
    }, []);
    //Open Modal for confirmation of posting a blog
    const handlePostOpen = () => {
        setPosting(true)
        setModalTxt("Are you sure you want to post the blog?")
        setOpen(true)       
    }
    //Open Modal for confirmation of saving a blog and to notify them about the  10 min rule
    const handleSaveOpen = () => {
        setSaving(true)
        setModalTxt("Your saved post can be edited for upto 10 mins !  Do you want to continue?")
        setOpen(true)
    }
    //When user confirms save or post, we then write to the firebase realitme DB 
    const handleSuccess = async() => {
        handleCancel()
        if(posting) {
            await postData()
            setPosting(false)
        }
        else if(saving) {
            await saveData()
            setSaving(false)
        }
        else {
            alert("Error encounterd. Please retry.")
        }
        //After successfully creating blog, user should be able to see his own blogs
        navigate("/view-blogs")
    }
    //Close the modal
    const handleCancel =() => {
        setOpen(false)
    }
    //Function to either save a new post or edit and save again a existing post
    const saveData = async () => {
        var req = 'POST' //request method

        //url to send the request to
        var url = `https://assignment-c3557-default-rtdb.asia-southeast1.firebasedatabase.app/blogs/${id}.json`;
        //This is the payload
        var reqData = {
            title: titleRef.current.value,
            description: contentRef.current.value,
            createdAt: new Date().getTime(), // to calculate if blog is editable and also to show most recent blog
            isPosted: false   // indicates weather user saved or posted the blog 
        }
        //If it is edit request, we know it form location variable for a individual blog post 
        if(put === true) {
            reqData = {
                title: titleRef.current.value,
                description: contentRef.current.value,
                createdAt: new Date().getTime(),
                isPosted: false    
            }
            req = 'PUT'
            url = `https://assignment-c3557-default-rtdb.asia-southeast1.firebasedatabase.app/blogs/${id}/${name}.json`;
        }

        //Sending request to the server
        const resp = await fetch(
        url,
        {
            method: req,
            body: JSON.stringify(reqData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //Error handling
        const data = await resp.json()
        if(!resp.ok) {
            const err = new Error("Unexpected Status:" + resp.status)
            err.data = data;
            err.resp = resp;
            throw err;
        }
    }

    const postData = async () => {
        var req = 'POST' //request method
        //url to send the reuquest if user createsa new post first time
        var url = `https://assignment-c3557-default-rtdb.asia-southeast1.firebasedatabase.app/blogs/${id}.json`;
        //Request payload
        const reqData = {
            title: titleRef.current.value,//user input title
            description: contentRef.current.value, //user input blog content
            createdAt: new Date().getTime(), // time of creation 
            isPosted: true  // this is a posting blog request not save
        }
        //If user were editing the post and then wanting to post or post his already saved draft without editiing
        if(put === true) {
            req = 'PUT' //request method for updating DB
            //URL for particular blog entry of a specific user for updating  
            url = `https://assignment-c3557-default-rtdb.asia-southeast1.firebasedatabase.app/blogs/${id}/${name}.json`;
        }
        //Actual request to server using fetch
        const resp = await fetch(url,
        {
            method: req,
            body: JSON.stringify(reqData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        //Response callback handling
        const data = await resp.json()
        //Handle failure case
        if(!resp.ok) {
            const err = new Error("Unexpected Status:" + resp.status)
            err.data = data;
            err.resp = resp;
            throw err;
        }
    }
    //JSX form for taking user input for creating a new blog or editing it
    return (
        <React.Fragment>
            <BlogDetails>
                <label>Title</label>
                <input defaultValue={titleVal} ref={titleRef} className="title" type="text" placeholder="Enter title" required></input>
                <label>Description</label>
                <textarea defaultValue={descrVal} ref={contentRef} className="desc" type="text" placeholder="Enter content" required/>
                <input className="post primary" onClick={handlePostOpen} type="button" value="Post" style={{float:"left"}}/>
                <input className="save primary" onClick={handleSaveOpen} type="button" value="Save" style={{float:"right"}}/>
            </BlogDetails>
            <Modal style={{marginTop: "16%", textAlign:"center"}} show={open} onHide={handleCancel}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <p>{modalTxt}</p>
                </Modal.Body>
                <Modal.Footer>
                    { <Button onClick={handleCancel} variant="secondary">Close</Button>}
                    <Button onClick={handleSuccess} variant="primary">Continue</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
};

export default BlogForm;