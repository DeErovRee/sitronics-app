import React from 'react'
import styled from 'styled-components'
import { MainComponent1 } from './mainPageComponent/MainComponent1'
import { MainComponent2 } from './mainPageComponent/MainComponent2'
import { MainComponent3 } from './mainPageComponent/MainComponent3'
import { MainComponent4 } from './mainPageComponent/MainComponent4'
import { MainComponent5 } from './mainPageComponent/MainComponent5'
import { MainComponent6 } from './mainPageComponent/MainComponent6'
import { MainComponent7 } from './mainPageComponent/MainComponent7'

const MainStyled = styled.div`
    display: flex;
    justify-content: center;
    background-color: #1e1e1e;
    color: white;
`

const Wrapper = styled.div`
    width: 100%;
    max-width: 1920px;
`

export const MainPage = () => {
    return (
        <MainStyled>
            <Wrapper>
                <MainComponent1 />

                <MainComponent2 />

                <MainComponent3 />

                <MainComponent4 />

                <MainComponent5 />

                <MainComponent6 />

                <MainComponent7 />
            </Wrapper>
        </MainStyled>
    )
}
