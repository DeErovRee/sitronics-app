import React from "react";
import styled from "styled-components";

const Content = styled.div`
    display: flex;
    flex-direction: row;
    padding: ${props => props.padding || '0'};

    background-image: 
        ${props => props.backgroundColor || props.theme.colors.gradient},
        url(${props => props.img});
    
    background-size: cover;
    background-position: center;

    @media${props => props.theme.media.tablet} {
        padding: 42px 37px;
        background-color: grey;
        background-image: 
        ${props => props.backgroundColor || props.theme.colors.gradient};
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection || 'row'};
    width: ${props => props.width || '100%'};
    align-items: ${props => props.alignItems || 'felx-start'};
    margin: ${props => props.margin || '0'};
    flex-wrap: ${props => props.wrap || 'nowrap'};
    justify-content: ${props => props.justifyContent || 'flex-start'};

    @media${props => props.theme.media.tablet} {
            margin: 0 0 60px 0;
        }
`

const ContainerFlex = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection || 'row'};
    width: ${props => props.width || '100%'};
    align-items: ${props => props.alignItems || 'felx-start'};
    margin: ${props => props.margin || '0'};
    flex-wrap: ${props => props.wrap || 'nowrap'};
    justify-content: ${props => props.justifyContent || 'flex-start'};

    @media${props => props.theme.media.tablet} {
        flex-direction: column;
    }
`

const H4 = styled.h4`
    display: flex;  
    font-size: 24px;
    font-weight: 400;
    line-height: 40px;
    margin: 0 0 54px 0;
    align-items: center;
    text-transform: uppercase;

    img {
        margin: 0 8px 0 0;
        width: 25px;
        height: auto;
    }


    @media${props => props.theme.media.tablet} {
            margin: 0 0 38px 0;
            font-size: 16px;

            img {
                width: 16px;
                height: auto;
            }
        }
`

const P = styled.p`
    font-size: 16px;
    font-weight: 200;
    margin: ${props => props.margin || '0'};
`

export const MainComponent3 = () => {
    return(
        <Content img={require('../../images/Sitronics-1.png')} padding={'108px 89px 343px'}>
          <ContainerFlex>
            <Container flexDirection={'column'} margin={'0 60px 0 0'}>
                <H4 >
                <img src={require('../../images/arrow-small-right.png')} alt="" />
                    Кому подойдет?
                </H4>
                <P>Мы в равной степени ориентированы на профессионалов и новичков, 
                    только открывающих для себя и своего бизнеса мир беспилотных технологий.</P>
            </Container>
            <Container flexDirection={'column'} >
                <H4>
                    <img src={require('../../images/arrow-small-right.png')} alt="" />
                    Для чего?
                </H4>
                <P>
                    Быстро и эффективно решаем задачи, связанные с аэрофотосъемкой, геодезией, трехмерным 
                    моделированием и визуализацией объектов исторического наследия, предприятий, и городов т.д.
                </P>
            </Container>
          </ContainerFlex>
        </Content>
    )
}