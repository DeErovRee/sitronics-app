import React from 'react'
import styled from 'styled-components'
import { ServicesStyled, Wrapper } from './servicesPage'
import { Drones } from './dronesComponent/drones'

const DronePageStyled = styled(ServicesStyled)``

const H1 = styled.h1`
    margin: 93px;

    @media (max-width: 950px) {
        margin: 39px;
    }
`

export const DronsPage = () => {
    return (
        <DronePageStyled>
            <Wrapper>
                <H1>ДРОНЫ</H1>
                <Drones />
            </Wrapper>
        </DronePageStyled>
    )
}
