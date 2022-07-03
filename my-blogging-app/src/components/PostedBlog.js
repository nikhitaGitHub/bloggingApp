import React from 'react'
import {useState} from 'react'
import Blog from '../UI/Blog.style.js';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

//This component handles the rendering and functionality of both the users to view only 
//blogs they created and also, so the user can view all latest blogs

const PostedBlog = (props) => {
    const [open, setOpen] = useState(false)
    var remainingTime = 0
    const entryTime = props.item.createdAt
    const navigate = useNavigate();
    const id = localStorage.getItem('uid')
    const name = props.uid

    //Calculate 10 minutes buffer time elapsed or not to allow or reject user from editing
    const handleEdit= () => {
        //Reject user edit upon clicking edit button
        remainingTime = (new Date().getTime() - entryTime) /1000
        if(remainingTime >= 600) {
            setOpen(true)
        }
        //Allow uer edit
        else {
            navigate('/create-blog', {state:{data:props}})
        }
    }

    //Edit unposted blogs
    const handleEditUnposted = () => {
        navigate('/create-blog', {state:{data:props}})
    }

    //Posting of saved blog 
    const handleCreate = async() => {
        const reqData = {
            title: props.item.title,
            description: props.item.description,
            createdAt: new Date().getTime(),
            isPosted: true    
        }
        await handleSubmission(reqData, "create")
        window.location.reload(true)//Refresh to reflect changes
    }

    //Deletion of draft or saved post
    const handleDelete = async() => {
        await handleSubmission('', "del")
        navigate("/view-blogs")
        window.location.reload(true)
    }

    //When user confirms thier changes 
    const handleSuccess = () => {
        handleCancel()
        navigate("/view-blogs")
    }

    //Dismissing modal
    const handleCancel =() => {
        setOpen(false)
    }

    //Updating already exisitng post or deleting it 
    const handleSubmission = async (reqData, type) => {
        var url = `https://assignment-c3557-default-rtdb.asia-southeast1.firebasedatabase.app/blogs/${id}/${name}.json`;
        //For update
        if(type === "create") {
            var req = 'PUT'
        }
        //For delete request
        else if(type === "del") {
            req = 'DELETE'
            reqData = ''
        }

        const resp = await fetch(url,
            {
                method: req,
                body: JSON.stringify(reqData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json()
            //Error handling
            if(!resp.ok) {
                const err = new Error("Unexpected Status:" + resp.status)
                err.data = data;
                err.resp = resp;
                throw err;
            }
    }
    //JSX to display both home screen and my blogs screen based on data fetched from backend for each screen
    return (
        <React.Fragment>
            { ((props.home && props.item.isPosted) || !(props.home)) &&
                (
                <div>
                    <hr/>
                    <div style={{display:"inline-block",width:"80%"}}>
                        <Blog>
                            <p className="title">{props.item.title}</p>
                        </Blog>
                        <Blog>
                            <p className="description">{props.item.description}</p>
                        </Blog>
                        {(props.home && props.item.isPosted) && 
                        <div>
                            <p style={{float:"left", fontSize: 10, fontStyle: "italic", marginBottom:0}} className="description">Created by {props.userId}</p>
                        </div>}
                    </div>
                    { ((new Date().getTime() - props.item.createdAt) < 600000 ) && props.item.isPosted && (
                        <Blog style={{float:"right", display:"inline-block"}}>
                            <Button style={{paddingRight: 0, paddingLeft: 0, border: "None", background:"transparent", marginRight: 8, cursor:"pointer", textDecoration:"underline", fontSize: 14, color:"#000"}} onClick={handleEdit} variant="primary">Edit</Button>
                        </Blog>
                    )}
                    {!props.item.isPosted && 
                    <div style={{width:"20%", display: "inline-block", float:"right"}}>
                        <div style={{ marginTop: 0, position:"relative", float:"right"}}>
                                <Button style={{paddingRight: 0, paddingLeft: 0, border: "None", background:"transparent", marginRight: 8, cursor:"pointer", textDecoration:"underline", fontSize: 14, color:"#000"}} onClick={handleEditUnposted} variant="primary">Edit</Button>
                                <Button style={{paddingRight: 0, paddingLeft: 0, border: "None", background:"transparent", marginRight: 8, cursor:"pointer", textDecoration:"underline", fontSize: 14, color:"#000"}} onClick={handleCreate} variant="primary">Post</Button>
                                <Button style={{paddingRight: 0, paddingLeft: 0, border: "None", background:"transparent", marginRight: 8, cursor:"pointer", textDecoration:"underline", fontSize: 14, color:"#000"}} onClick={handleDelete} variant="primary">Delete</Button>
                        </div>
                        <div style={{marginTop:"3%", marginRight:"12%", display:"block", position:"relative", float:"right"}}>
                            <p style={{ float:"right", color:"red", fontSize: 12, fontStyle: "italic", marginTop: "5%"}}>Saved Draft</p>
                        </div>    
                    </div>
                    }
                    <hr/>
                    </div>
                    )}
                    <Modal style={{marginTop: "16%", textAlign:"center"}} show={open} onHide={handleCancel}>
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                            <p>Sorry, the post was created more than 10  minutes ago ! You can no longer edit it.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={handleCancel} variant="secondary">Close</Button>
                            <Button onClick={handleSuccess} variant="primary">Continue</Button>
                        </Modal.Footer>
                    </Modal>
        </React.Fragment>
    )
};

export default PostedBlog;