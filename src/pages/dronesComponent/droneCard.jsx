import React from "react";
import styled from "styled-components";

const DroneCardStyled = styled.div`
    background-image: url(${props => props.background});
    width: 100%;
    max-width: 863px;
    height: 288px;
    border-radius: 40px;
    background-size: cover;
    margin-bottom: 50px;
`

const DetailsBtn = styled.button`
    color: white;
    text-transform: uppercase;
    border-radius: 15px;
    border: 2px solid white;
    background: rgba(0,0,0, 0.3);
    padding: 15px 25px;
    margin-right: 126px;
`

const H2 = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: white;
    margin: 0 0 54px;
`

const DroneCardFilter = styled.div`
    box-sizing: border-box;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    background-color: rgba(0,0,0, 0.3);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    padding: 26px;
`

export const DroneCard = ({title, background}) => {
    return(
        <DroneCardStyled background={background}>
            {console.log(background)}
            <DroneCardFilter>
                <H2>{title}</H2>
                <DetailsBtn>Подробнее</DetailsBtn>
            </DroneCardFilter>
        </DroneCardStyled>
        
    )
}