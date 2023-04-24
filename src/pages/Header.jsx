import { React } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HeaderStyled = styled.div`
  background-color: #1E1E1E;
  color: white;
  position: sticky;
  top: 0;
`

const Wrapper = styled.nav`
  max-width: 1920px;
  padding: 32px 96px;
`

const List = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0;
  justify-content: space-between;
  align-items: center;
`

const ListItem = styled.li`
  //привязано к стилю тега "а" в App.scss

  display: flex;
  flex-direction: row;
  margin: 0 20px;
  text-decoration: none;
  
  & a {
    text-decoration: none;
    color: white;
  };
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

    return(
      <HeaderStyled>
        <Wrapper>
          <List>
            <ListItem>
              <Link to="/">
                <img
                  src={require('../images/logo.png')}
                  className="logo"
                  alt="logo"/>
              </Link>
            </ListItem>
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
            <Component authenticated={authenticated}/>
          </List>
        </Wrapper>
      </HeaderStyled>

        // <header>
        //   <nav>
        //     <ul className="header">
        //       <li>
        //         <Link to="/">
        //           <img
        //             src={require('../images/logo.png')}
        //             className="logo"
        //             alt="logo"
        //           />
        //         </Link>
        //       </li>
        //       <div className="headerCenter">
        //         <li>
        //           <Link to="/drons">Дроны</Link>
        //         </li>
        //         <li>
        //           <Link to="/services">Услуги</Link>
        //         </li>
        //         <Chats authenticated={authenticated}/>
        //         <li>
        //           <Link to="/contacts">Контакты</Link>
        //         </li>
        //       </div>
        //       <Component authenticated={authenticated}/>
        //     </ul>
        //   </nav>
        // </header>
    )
}