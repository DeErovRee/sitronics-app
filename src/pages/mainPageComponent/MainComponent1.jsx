import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Content = styled.div`
    display: flex;
    flex-direction: row;
    padding: ${(props) => props.padding || '0'};

    background-image: ${(props) => props.backgroundColor || props.theme.colors.gradient}, url(${(props) => props.img});

    background-size: cover;
    background-position: center;

    @media${(props) => props.theme.media.tablet} {
        padding: 101px 37px;
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: ${(props) => props.flexDirection || 'row'};
    width: ${(props) => props.width || '100%'};
    align-items: ${(props) => props.alignItems || 'felx-start'};
    flex-wrap: ${(props) => props.wrap || 'nowrap'};

    @media (max-width: 500px) {
        width: 100%;
    }
`

const H3 = styled.h3`
    font-size: 38px;
    font-weight: 200;
    line-height: 40px;

    @media${(props) => props.theme.media.tablet} {
        font-size: 21px;
        font-weight: 300;
    }
`

const TextDecor = styled.span`
    white-space: break-spaces;
    font-weight: 700;
    color: #4285f4;
`

const Button = styled.button`
    a {
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: none;
        color: white;
        padding: 12px 46px;

        p {
            height: auto;
        }
    }

    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid white;
    background: transparent;
    color: white;
    margin: ${(props) => props.margin || '0'};

    svg {
        width: 25px;
    }
`

const P = styled.p`
    font-size: 25px;
    font-weight: 200;
    margin: ${(props) => props.margin || '0'};
`

export const MainComponent1 = () => {
    return (
        <Content img={require('../../images/white-drone-hovering-bright-blue-sky.png')} padding={'244px 89px'}>
            <Container flexDirection={'column'} width={'60%'} alignItems={'flex-start'}>
                <H3>Широкий спектр услуг в области беспилотных технологий.</H3>
                <H3>
                    Получи <TextDecor>профессиональную</TextDecor> съемку уже сейчас!
                </H3>
                <Button margin={'35px 0 0 0'}>
                    <Link to='/services'>
                        <P margin={'0 15px 0 0'}>Оставить заявку</P>
                        <svg width='43' height='19' viewBox='0 0 43 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M25.5208 18.2916C24.9791 17.9583 24.7191 17.5555 24.7408 17.0833C24.7624 16.611 25.045 16.2083 25.5885 15.8749L33.2395 11.1666H3.04159C2.27423 11.1666 1.63055 11.0066 1.11055 10.6866C0.590553 10.3666 0.331456 9.97103 0.333261 9.49992C0.333261 9.0277 0.593262 8.63159 1.11326 8.31159C1.63326 7.99159 2.27604 7.83214 3.04159 7.83325H33.2395L25.5208 3.08325C24.9791 2.74992 24.7083 2.35381 24.7083 1.89492C24.7083 1.43603 24.9791 1.04047 25.5208 0.708252C26.0624 0.374918 26.7061 0.208252 27.4518 0.208252C28.1975 0.208252 28.8403 0.374918 29.3801 0.708252L41.7707 8.33325C42.0416 8.49992 42.2339 8.68048 42.3476 8.87492C42.4614 9.06936 42.5173 9.2777 42.5155 9.49992C42.5155 9.72214 42.4587 9.93048 42.3449 10.1249C42.2312 10.3194 42.0398 10.4999 41.7707 10.6666L29.3124 18.3333C28.8159 18.6388 28.1957 18.7916 27.4518 18.7916C26.7079 18.7916 26.0642 18.6249 25.5208 18.2916Z'
                                fill='white'
                            />
                        </svg>
                    </Link>
                </Button>
            </Container>
        </Content>
    )
}
