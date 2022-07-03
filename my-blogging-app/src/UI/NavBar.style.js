import styled from 'styled-components';

const NavBar = styled.div `
    
    margin: auto;
    background: #42b9f5;

    .nav-item {
        display: inline-block;
        padding: 2%;
    }

    & a {
        text-decoration: none;
        pointer: cursor;
        color: #FFF;
        font-weight: bolder;
        font-size: 18px
    }

    .nav-link-btn {
        text-decoration: none;
        pointer: cursor;
        color: #FFF;
        font-weight: bolder;
        font-size: 18px;
        background: transparent;
        border: None;
    }

    &a:hover {
        pointer: cursor;
        color: #000
    }
`;

export default NavBar;