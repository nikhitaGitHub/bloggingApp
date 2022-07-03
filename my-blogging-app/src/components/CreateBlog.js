import React from 'react'
import Nav from './Nav.js'
import BlogForm from './BlogForm.js'

//This is component made up of 2 sub components to allow user to create new blog 
//Nav is actually the header navigation
// BlogForm is the acutal form where user enters title and description
const CreateBlog = () => 
{
    return (
    <React.Fragment>
        <Nav/>
        <BlogForm/>
    </React.Fragment>
    )
}

export default CreateBlog