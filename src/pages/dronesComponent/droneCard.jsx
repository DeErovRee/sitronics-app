import React from "react";
import { Link } from "react-router-dom";
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
<<<<<<< Updated upstream
    cursor: pointer;
=======
>>>>>>> Stashed changes
`

const H2 = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: white;
    margin: 0 0 54px;

    @media (max-width: 950px) {
        text-align: center;
    }
`

export const DroneCardFilter = styled.div`
    box-sizing: border-box;
    width: initial;
    height: inherit;
    border-radius: inherit;
    background-color: rgba(0,0,0, 0.3);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    padding: 26px;

    @media (max-width: 950px) {
        align-items: center;
    }
`

const DroneCardSlicer = styled.div`
    width: 40%;

    @media (max-width: 950px) {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

<<<<<<< Updated upstream
export const DroneCard = ({title, background, url, advantages, description}) => {
=======
export const DroneCard = ({title, background, url}) => {
>>>>>>> Stashed changes
    return(
        <DroneCardStyled background={background}>
            {console.log(description)}
            <DroneCardFilter>
<<<<<<< Updated upstream
                <DroneCardSlicer>
                    <H2>{title}</H2>
                    <Link 
                        to={{pathname: url}} 
                        state={{
                            url: url, 
                            title: title, 
                            background: background,
                            advantages: advantages,
                            description: description,
                        }}>
                        <DetailsBtn>Подробнее</DetailsBtn>
                    </Link>
                </DroneCardSlicer>
=======
                <H2>{title}</H2>
                <Link to={{ pathname: url }}>
                    <DetailsBtn>Подробнее</DetailsBtn>
                </Link>
>>>>>>> Stashed changes
            </DroneCardFilter>
        </DroneCardStyled>
        
    )
}