import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { ServicesStyled, Wrapper } from "../servicesPage";
import { DroneCardFilter } from "./droneCard";

const DronePageStyled = styled(ServicesStyled)``

const DroneWrapper = styled(Wrapper)`
    background-image: url(${props => props.background});
    display: flex;
    background-size: cover;
    background-repeat: no-repeat;
    align-items: flex-end;
`

const DronePageFilter = styled(DroneCardFilter)`
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    padding: 32px 96px;
    justify-content: unset;
`

const AdvantegesBlock = styled.div`
    width: 40%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.68);
    border-radius: 50px;
    padding: 39px;
    align-self: center;
    align-items: center;
    flex-direction: column;
    margin: 120px 0 105px 0;
`

const ABchield = styled.div`
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const H1 = styled.h1`
    margin: 171px 0 0;
    font-size: 48px;
    font-weight: 700;
    text-transform: uppercase;
`

const H3 = styled.h3`
    margin: 0;
    font-size: 20px;
    font-weight: 800;
    line-height: 24.8px;
    text-transform: uppercase;
`

const P = styled.p`
    margin: 85px 0 0;
    font-size: 24px;
    font-weight: 400;
    line-height: 29.76px;
    padding: 0 300px 0 0;
`

export const DronPage = () => {

    const location = useLocation()
    const { title, description, advantages } = location.state

    return(
        <DronePageStyled>
            <DroneWrapper background={require('../../images/delivery_drone.png')}>
                <DronePageFilter>
                    <div style={{width: '50%', color: 'black'}}>
                        <H1>{title}</H1>
                        <P>{description}</P>
                    </div>
                    {advantages && 
                    <AdvantegesBlock>
                        <H3>Преимущества</H3>
                        <ABchield >
                            {advantages.map(el => <p style={{width: '50%', display: 'block', marginTop: '40px'}}>{el}</p>)}
                        </ABchield>
                    </AdvantegesBlock>}
                </DronePageFilter>
            </DroneWrapper>
        </DronePageStyled>
    )
}