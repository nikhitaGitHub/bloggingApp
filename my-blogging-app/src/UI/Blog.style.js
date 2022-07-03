import styled from 'styled-components';

const Blog = styled.div `
    
    .title {
        font-size: 16px;
        font-weight: bold;
        color: #1B5EC1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .description {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 40px;
    }
`

export default Blog;