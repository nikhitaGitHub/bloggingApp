import styled from 'styled-components';

const FormControl = styled.form `
    display: block;
    text-align: center;
    justify-content: center;
    margin: auto;
    background: #42b9f5;
    border-radius: 22px;
    padding: 4%;
    align-items: center;
    width: 35%;
    vertical-align: middle;
    margin-top: 12%;

    & label {
        display: block;
        width: 90%;
        margin-bottom: 10px;
        font-weight: bolder;
    }
    & input {
        border-color: #1051F3;
        width: 90%;
        display: block;
        margin: auto;
        margin-bottom: 25px;
        height: 44px;
        font-size: 18px;
        border-radius: 8px;
    }
    & input[type="button"] {
        background: #FFFFFF;
        height: 48px;
        font-weight: bold;
        font-size: 18px;
        border-color: #1051F3;
        border-radius: 10;
    }
`;

export default FormControl;