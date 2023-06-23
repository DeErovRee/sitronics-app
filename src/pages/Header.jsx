import { React, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useOnClickOutSide } from '../hooks/useOnClickOutSide'

const HeaderStyled = styled.div`
  background-color: #1E1E1E;
  color: white;
  position: relative;
  z-index: 99;
  display: flex;
  justify-content: center;
`

const Wrapper = styled.nav`
  width: 100%;
  max-width: 1920px;
  padding: 32px 96px;

  @media ${props => props.theme.media.tablet} {
    padding: 28px 28px;
  }
`

const List = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const BurgerBtn = styled.div`
  background-color: transparent;
  color: white;
  display: none;
  position: absolute;
  font-size: 30px;
  top: 63px;
  // top: 28px;
  right: 40px;
  z-index: 110;
  transform: ${({isOpen}) => isOpen ? 'rotate(0)' : 'rotate(90deg)'};
  transition: transform 0.3s ease-in-out;

  @media ${props => props.theme.media.tablet} {
    display: unset;
  }
`

const BurgerMenu = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  padding: 10px 0 10px 0px;
  background: #1e1e1e;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: ${({isOpen}) => isOpen ? 'translateY(0px)' : 'translateY(-100%)'};
  transition: transform 0.3s ease-in-out;

  @media ${props => props.theme.media.desktop} {
    display: none;
  }
`

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  margin: 0 20px;
  text-decoration: none;
  
  & a {
    text-decoration: none;
    color: white;
  };

  @media ${props => props.theme.media.tablet} {
    display: ${props => props.noHidden || 'none'};
    margin: 0 0 15px;
    
  }
`

const LoginButton = styled.button`
  color: white;
  border: 1px solid white;
  padding: 8px 28px;
  border-radius: 5px;
  background: transparent;
  &:hover {
    cursor: pointer;
  };
`

const Component = ({authenticated}) => {
    return authenticated ? 
      <Link to="/personalArea" >
        <LoginButton >Личный кабинет</LoginButton>
      </Link>
      : 
      <Link to="/login" >
        <LoginButton >Войти</LoginButton>
      </Link>
};

const Chats = ({authenticated}) => {
    return authenticated ? 
      <ListItem noHidden={'flex'}>
        <Link to="/chats">Чат</Link>
      </ListItem>
      : 
      <></>
};

export const Header = ({authenticated}) => {
  const node = useRef()
  const [isOpen, setIsOpen] = useState(false)

  useOnClickOutSide(node, () => setIsOpen(false))

    return(
      <>
      <HeaderStyled>
        <Wrapper>
          <List>
            <Link to="/" >
              <img
                src={require('../images/logo.png')}
                className="logo"
                alt="logo"/>
            </Link>
            <ListItem>
              <List>
                <ListItem>
                <Link to="/drons">Дроны</Link>
                </ListItem>
                <ListItem>
                  <Link to="/services">Услуги</Link>
                </ListItem>
                <ListItem>
                  <Link to="/contacts">Контакты</Link>
                </ListItem>
                <Chats authenticated={authenticated}/>
              </List>
            </ListItem>
            <ListItem>
              <Component authenticated={authenticated}/>
            </ListItem>
          </List>
        </Wrapper>
      </HeaderStyled>
      <div ref={node}>
      <BurgerBtn isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>|||</BurgerBtn>
      <BurgerMenu id='burgerMenu' isOpen={isOpen} >
        <ListItem noHidden={'flex'} >
          <Link to="/drons">Дроны</Link>
        </ListItem>
        <ListItem noHidden={'flex'}>
          <Link to="/services">Услуги</Link>
        </ListItem>
        <ListItem noHidden={'flex'}>
          <Link to="/contacts">Контакты</Link>
        </ListItem>
        <Chats authenticated={authenticated}/>
        <Component authenticated={authenticated}/>
      </BurgerMenu>
      </div>
      </>
    )
}