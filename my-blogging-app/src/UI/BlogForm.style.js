import styled from 'styled-components';

const BlogDetails = styled.form `
    display: block;
    text-align: left;
    margin: auto;
    padding: 4%;
    width: 70%;
    margin-top: 2%;

    & label {
        display: block;
        margin: auto;
    }

    & input {
        display: block;
        margin: auto;
        margin-top: 2%;
        margin-bottom: 5%;
        justify-content:flex-start;
        border-radius: 10px;
        border: 1px solid gray;
    }

    & textarea {
        border-radius: 10px
    }

    .title {
        width: 100%;
        height: 44px;
        padding-left: 3%;
    }

    .desc {
        height: 300px;
        width: 100%;
        padding-left: 3%;
        padding-top: 2%;
        padding-right: 3%
        line-height: 32px;
    }

    & input[type="button"] {
        display: inline-block;
        background: #1051F3 ;
        height: 48px;
        width : 28%;
        font-weight: bold;
        font-size: 18px;
        border-color: blue;
        border-radius: 10px;
        color: #FFF
    }

    .save {
        margin-left: 10%;
    }
`

export default BlogDetails;