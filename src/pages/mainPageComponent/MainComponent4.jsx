import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
    display: flex;
    flex-direction: row;
    padding: ${(props) => props.padding || '0'};

    background-image: ${(props) => props.backgroundColor || props.theme.colors.gradient}, url(${(props) => props.img});

    background-size: cover;
    background-position: center;

    @media${(props) => props.theme.media.tablet} {
        padding: 41px 28px;
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: ${(props) => props.flexDirection || 'row'};
    width: ${(props) => props.width || '100%'};
    align-items: ${(props) => props.alignItems || 'felx-start'};
    margin: ${(props) => props.margin || '0'};
    flex-wrap: ${(props) => props.wrap || 'nowrap'};
    justify-content: ${(props) => props.justifyContent || 'flex-start'};

    @media (max-width: 1250px) {
        flex-direction: column;
        width: 100%;

        div {
            flex-direction: row;
            justify-content: center;
        }
    }
`

const H2 = styled.h2`
    font-size: 36px;
    font-weight: 500;
    line-height: 59px;
    text-transform: uppercase;
    white-space: nowrap;
    margin: ${(props) => props.margin || '0'};

    @media (max-width: 1250px) {
        text-align: center;
    }

    @media${(props) => props.theme.media.tablet} {
        font-size: 25px;
    }
`

const TextDecor = styled.span`
    white-space: break-spaces;
    font-weight: 700;
    color: #4285f4;
`

const ProviderCard = styled.img`
    width: 174px;
    border-radius: 20px;
    margin: 20px 30px;
`

export const MainComponent4 = () => {
    return (
        <Content backgroundColor={'background-color: #1E1E1E'} padding={'120px 89px'}>
            <Container alignItems={'center'}>
                <Container width={'50%'}>
                    <H2>
                        <TextDecor>Основные поставщики услуг</TextDecor>
                    </H2>
                </Container>
                <Container wrap={'wrap'} width={'50%'} justifyContent={'flex-end'}>
                    <ProviderCard src={require('../../images/albatros_logo.png')} alt='' />
                    <ProviderCard src={require('../../images/coex_logo.png')} alt='' />
                    <ProviderCard src={require('../../images/geoscan_logo.png')} alt='' />
                    <ProviderCard src={require('../../images/supercam_logo.png')} alt='' />
                    <ProviderCard src={require('../../images/drone_center_logo.png')} alt='' />
                    <ProviderCard src={require('../../images/aerodyne_logo.png')} alt='' />
                </Container>
            </Container>
        </Content>
    )
}
