import { React } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FooterStyled = styled.div`
    display: flex;
    justify-content: center;
    background-color: #1e1e1e;
    color: white;
`

export const Wrapper = styled.div`
    width: 100%;
    max-width: 1920px;
    padding: 50px 96px;

    @media ${(props) => props.theme.media.tablet} {
    }

    @media ${(props) => props.theme.media.phone} {
        padding: 37px 48px;
    }
`

const First = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media ${(props) => props.theme.media.tablet} {
        flex-direction: column;
        align-items: flex-start;
    }

    @media ${(props) => props.theme.media.phone} {
        flex-direction: column;
        align-items: flex-start;
    }
`

const List = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    width: ${(props) => props.width || 'auto'};
    justify-content: ${(props) => props.justifyContent || 'flex-start'};
    align-items: flex-start;
    margin: 0;

    @media ${(props) => props.theme.media.tablet} {
        margin: 0 0 25px 0;
    }

    @media ${(props) => props.theme.media.phone} {
        margin: 0 0 25px 0;
    }
`

const ListItem = styled.li`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    font-size: 16px;
    font-weight: 200;
    line-height: 20px;
    margin: 0 0 4px 0;
    text-transform: ${(props) => props.textTransform || 'none'};
    &:hover {
        cursor: pointer;
    }

    @media ${(props) => props.theme.media.tablet} {
        margin: 0 0 11px 0;
    }

    @media ${(props) => props.theme.media.phone} {
        margin: 0 0 11px 0;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`

const ListImg = styled.div`
    height: ${(props) => props.height || 'auto'}
    width: ${(props) => props.width || 'auto'};
    margin: 0 10px 0 0;
`

export const Footer = () => {
    return (
        <FooterStyled>
            <Wrapper>
                <First>
                    <List>
                        <img src={require('../images/logo.png')} alt='' />
                    </List>
                    <List>
                        <ListItem textTransform={'uppercase'}>
                            <ListImg height={'15px'}>
                                <svg
                                    width='15'
                                    height='16'
                                    viewBox='0 0 15 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M3.1875 0.5V2H12.2366L0.3125 14.4425L1.32594 15.5L13.25 3.0575V12.5H14.6875V0.5H3.1875Z'
                                        fill='white'
                                    />
                                </svg>
                            </ListImg>
                            <p>vk</p>
                        </ListItem>
                        <ListItem textTransform={'uppercase'}>
                            <ListImg height={'15px'}>
                                <svg
                                    width='15'
                                    height='16'
                                    viewBox='0 0 15 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M3.1875 0.5V2H12.2366L0.3125 14.4425L1.32594 15.5L13.25 3.0575V12.5H14.6875V0.5H3.1875Z'
                                        fill='white'
                                    />
                                </svg>
                            </ListImg>
                            <p>telegram</p>
                        </ListItem>
                    </List>
                    <List justifyContent={'space-between'}>
                        <ListItem>
                            <Link to='/'>Главная</Link>
                        </ListItem>
                        <ListItem>
                            <Link to=''>О нас</Link>
                        </ListItem>
                        <ListItem>
                            <Link to='/drones'>Дроны</Link>
                        </ListItem>
                        <ListItem>
                            <Link to='/services'>Услуги</Link>
                        </ListItem>
                        {/* <ListItem><Link to='/contacts'>Контакты</Link></ListItem> */}
                    </List>
                    <List justifyContent={'space-between'} width={'33%'}>
                        <ListItem>
                            <ListImg width={'20px'}>
                                <svg
                                    width='23'
                                    height='23'
                                    viewBox='0 0 23 23'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M21.3217 15.3316L16.1691 13.0227L16.1549 13.0161C15.8874 12.9017 15.5956 12.8558 15.3058 12.8825C15.0161 12.9093 14.7377 13.0078 14.4956 13.1692C14.4671 13.1881 14.4397 13.2085 14.4136 13.2305L11.7514 15.5C10.0649 14.6808 8.3236 12.9527 7.50438 11.288L9.7772 8.58534C9.79907 8.55799 9.81985 8.53065 9.83954 8.50112C9.99751 8.25973 10.0934 7.98303 10.1185 7.69565C10.1437 7.40827 10.0975 7.11912 9.98392 6.85393V6.8408L7.66845 1.6794C7.51832 1.33297 7.26018 1.04438 6.93256 0.856721C6.60494 0.669059 6.22541 0.592386 5.85063 0.638148C4.36857 0.833171 3.00817 1.56102 2.02353 2.68575C1.03889 3.81048 0.49733 5.25518 0.50001 6.75002C0.50001 15.4344 7.56563 22.5 16.25 22.5C17.7448 22.5027 19.1895 21.9611 20.3143 20.9765C21.439 19.9919 22.1669 18.6315 22.3619 17.1494C22.4077 16.7747 22.3312 16.3953 22.1438 16.0677C21.9563 15.7401 21.668 15.4819 21.3217 15.3316ZM16.25 20.75C12.5382 20.746 8.97962 19.2697 6.35499 16.645C3.73036 14.0204 2.25406 10.4618 2.25001 6.75002C2.2459 5.68196 2.63069 4.64892 3.33253 3.84383C4.03438 3.03873 5.00528 2.51663 6.06392 2.37502C6.06349 2.37939 6.06349 2.38378 6.06392 2.38815L8.36079 7.52877L6.10001 10.2347C6.07706 10.2611 6.05622 10.2893 6.03767 10.3189C5.87307 10.5715 5.77652 10.8623 5.75735 11.1632C5.73819 11.464 5.79707 11.7647 5.92829 12.0361C6.91923 14.0628 8.96126 16.0896 11.0099 17.0794C11.2833 17.2094 11.5857 17.2662 11.8876 17.2444C12.1896 17.2225 12.4807 17.1227 12.7325 16.9547C12.7606 16.9358 12.7876 16.9153 12.8134 16.8935L15.4724 14.625L20.613 16.9274H20.625C20.4851 17.9875 19.9638 18.9604 19.1586 19.6639C18.3533 20.3675 17.3193 20.7536 16.25 20.75Z'
                                        fill='white'
                                    />
                                </svg>
                            </ListImg>
                            <p>+7 (495) 225-98-29</p>
                        </ListItem>
                        <ListItem>
                            <ListImg width={'20px'}>
                                <svg
                                    width='18'
                                    height='24'
                                    viewBox='0 0 18 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M8.99992 0.333252C4.48492 0.333252 0.833252 3.98492 0.833252 8.49992C0.833252 14.6249 8.99992 23.6666 8.99992 23.6666C8.99992 23.6666 17.1666 14.6249 17.1666 8.49992C17.1666 3.98492 13.5149 0.333252 8.99992 0.333252ZM3.16659 8.49992C3.16659 5.27992 5.77992 2.66659 8.99992 2.66659C12.2199 2.66659 14.8333 5.27992 14.8333 8.49992C14.8333 11.8599 11.4733 16.8883 8.99992 20.0266C6.57325 16.9116 3.16659 11.8249 3.16659 8.49992Z'
                                        fill='white'
                                    />
                                </svg>
                            </ListImg>
                            <p>109316, Москва, Волгоградский проспект, 32к31</p>
                        </ListItem>
                        <ListItem>
                            <ListImg width={'20px'}>
                                <svg
                                    width='24'
                                    height='20'
                                    viewBox='0 0 24 20'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M2.66659 19.3334C2.02492 19.3334 1.47542 19.1048 1.01809 18.6474C0.560754 18.1901 0.332476 17.641 0.333254 17.0001V3.00008C0.333254 2.35842 0.561921 1.80892 1.01925 1.35158C1.47659 0.89425 2.0257 0.665972 2.66659 0.66675H21.3333C21.9749 0.66675 22.5244 0.895416 22.9818 1.35275C23.4391 1.81008 23.6674 2.35919 23.6666 3.00008V17.0001C23.6666 17.6418 23.4379 18.1913 22.9806 18.6486C22.5233 19.1059 21.9741 19.3342 21.3333 19.3334H2.66659ZM21.3333 5.33342L12.6124 10.7876C12.5152 10.8459 12.4129 10.8899 12.3056 10.9194C12.1983 10.949 12.0964 10.9634 11.9999 10.9626C11.9027 10.9626 11.8004 10.9482 11.6931 10.9194C11.5858 10.8906 11.4839 10.8467 11.3874 10.7876L2.66659 5.33342V17.0001H21.3333V5.33342ZM11.9999 8.83342L21.3333 3.00008H2.66659L11.9999 8.83342ZM2.66659 5.62508V3.90425V3.93342V3.91942V5.62508Z'
                                        fill='white'
                                    />
                                </svg>
                            </ListImg>
                            <p>support@sitronics.com info@sitronics.com</p>
                        </ListItem>
                    </List>
                </First>
                <p style={{ marginTop: '20px' }}>&copy;&nbsp;2023 Все права защищены</p>
            </Wrapper>
        </FooterStyled>
    )
}
