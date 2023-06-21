import styled from "styled-components";

export const Input = styled.input`
    margin: 8px;
    padding: 15px;
    width: 100%;
    border: 1px solid rgb(217, 217, 217);
    border-radius: 10px;
    outline: none;
    text-align: center;
`

export const Button = styled.button`
    border: none;
    border-radius: 10px;
    padding: 15px;
    text-transform: uppercase;
    background-color: rgb(141, 164, 241);

    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    color: white;

    cursor: pointer;
`

export const Card = styled.div`
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: white;
    color: black;
    border-radius: 20px;
    padding: 20px 29px;
    margin-bottom: 10px;
    box-sizing: border-box;

    @media (max-width: 625px) {
        margin: 10px auto;
    }
`

export const CardHeader = styled.h3`
    align-self: center;
    margin: 0 0 10px;
`