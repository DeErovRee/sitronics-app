import React from "react";
import styled from "styled-components";

const Box = styled.div`
    background-color: #D9D9D9;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 910px;
    padding: 12px;
    color: black;
    border-radius: 10px;
    box-sizing: border-box;

    p {
        margin-left: 10px;
    };

    @media(max-width: 950px) {
        border-radius: 0;
        width: 100%;
    };

    @media(max-width: 520px) {
        flex-direction: column;
        p {
            margin-left: 0;
            margin-top: 10px;
        }
    };

`

export const Sort = () => {
    return(
        <Box>
            <div>Сортировать по:</div>
            <p>Популярности</p>
            <p>Рейтингу</p>
            <p>Цене</p>
        </Box>
    )
}