import { React } from 'react'
import { Link } from 'react-router-dom'

const Component = ({authenticated}) => {
    return authenticated ? (
        <Link to="/personalArea" className="loginBtn">Личный кабинет</Link>
    ) : (
        <Link to="/login" className="loginBtn">Войти</Link>
    );
  };

const Chats = ({authenticated}) => {
    return authenticated ? (
      <li>
        <Link to="/chats">Чат</Link>
      </li>
    ) : (
      <></>
    );
  };

export const Header = ({authenticated}) => {

    return(
        <header>
          <nav>
            <ul className="header">
              <li>
                <Link to="/">
                  <img
                    src={require('../images/logo.png')}
                    className="logo"
                    alt="logo"
                  />
                </Link>
              </li>
              <div className="headerCenter">
                <li>
                  <Link to="/drons">Дроны</Link>
                </li>
                <li>
                  <Link to="/services">Услуги</Link>
                </li>
                <Chats authenticated={authenticated}/>
                <li>
                  <Link to="/contacts">Контакты</Link>
                </li>
              </div>
              <Component authenticated={authenticated}/>
            </ul>
          </nav>
        </header>
    )
}