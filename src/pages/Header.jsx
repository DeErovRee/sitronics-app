import { React } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HeaderStyled = styled.div`
  background-color: #1E1E1E;
  color: white;
`

const Wrapper = styled.nav`
  max-width: 1920px;
  padding: 32px 96px;

  @media ${props => props.theme.media.tablet} {

  }

  @media ${props => props.theme.media.phone} {
    padding: 28px 40px;
  }
`

const List = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const BurgerBtn = styled.div`
  background-color: red;
  display: none;

  @media ${props => props.theme.media.tablet} {
    display: unset;
  }

  @media ${props => props.theme.media.phone} {
    display: unset;
  }
`

const BurgerMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  }

  @media ${props => props.theme.media.phone} {
    display: ${props => props.noHidden || 'none'};
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
    return authenticated ? (
        <Link to="/personalArea" >
          <LoginButton >Личный кабинет</LoginButton>
        </Link>
    ) : (
        <Link to="/login" >
          <LoginButton >Войти</LoginButton>
        </Link>
    );
};

const Chats = ({authenticated}) => {
    return authenticated ? (
      <ListItem>
        <Link to="/chats">Чат</Link>
      </ListItem>
    ) : (
      <></>
    );
};

export const Header = ({authenticated}) => {

  const openMenu = () => {
    
  }

    return(
      <HeaderStyled>
        <Wrapper>
          <List>
            <Link to="/">
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
            <BurgerBtn onClick={openMenu}>|||</BurgerBtn>
          </List>
          <BurgerMenu id='burgerMenu'>
            <ListItem noHidden={'flex'}>
              <Link to="/drons">Дроны</Link>
            </ListItem>
            <ListItem noHidden={'flex'}>
              <Link to="/services">Услуги</Link>
            </ListItem>
            <ListItem noHidden={'flex'}>
              <Link to="/contacts">Контакты</Link>
            </ListItem>
            <Chats authenticated={authenticated}/>
          </BurgerMenu>
        </Wrapper>
      </HeaderStyled>
    )
}