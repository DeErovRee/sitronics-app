import "./App.scss";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { ServicesPage } from "./pages/servicesPage";
import { MainPage } from "./pages/mainPage";
import { DronsPage } from "./pages/dronsPage";
import { LoginPage } from "./pages/loginPage";
import { SignupPage } from "./pages/signupPage";
import { PersonalAreaPage } from "./pages/personalAreaPage";
import { Page404 } from "./pages/page404";
import { ChatsPage } from "./pages/chatsPage";
import { ServicePage } from "./pages/servicePage";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import { PublicRoute } from "./hocs/publicRoute";
import { PrivateRoute } from "./hocs/privateRoute";
import { ContactsPage } from "./pages/contactsPage";

export const App = () => {
  const [authed, setAuthed] = useState(false);

  const AuthedCheck = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(false);
      }
    });
  };

  const Component = () => {
    return authed ? (
      <li className="loginBtn">
        <Link to="/personalArea">Личный кабинет</Link>
      </li>
    ) : (
      <li className="loginBtn">
        <Link to="/login">Войти</Link>
      </li>
    );
  };

  const Chats = () => {
    return authed ? (
      <li>
        <Link to="/chats">Чат</Link>
      </li>
    ) : (
      <></>
    );
  };

  useEffect(() => {
    AuthedCheck();
  }, []);

  return (
    <Router>
      <Provider store={store}>
        <header>
          <nav>
            <ul className="header">
              <li>
                <Link to="/">
                  <img
                    src={require('./images/logo.png')}
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
                <Chats />
                <li>
                  <Link to="/contacts">Контакты</Link>
                </li>
              </div>
              <Component />
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="/drons" element={<DronsPage />} />
            <Route exact path="/services" element={<ServicesPage />} />
            <Route exact path="/contacts" element={<ContactsPage />} />
            <Route
              exact
              path="/chats"
              element={
                <PrivateRoute authenticated={authed}>
                  <ChatsPage />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/personalArea/*"
              element={
                <PrivateRoute authenticated={authed}>
                  <PersonalAreaPage />
                </PrivateRoute>
              }
            />
            <Route
              authenticated={authed}
              exact
              path="/login"
              element={
                <PublicRoute authenticated={authed}>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              authenticated={authed}
              exact
              path="/signup"
              element={
                <PublicRoute authenticated={authed}>
                  <SignupPage />
                </PublicRoute>
              }
            />
            <Route exact path="*" element={<Page404 />} />
            <Route exact path='services/*' element={<ServicePage />} />
          </Routes>
        </main>
        <footer>
          <div className="footer">
            <ul className="footerMaxWidth">
              <li>
                <p>&copy;&nbsp;2023 Все права защищены</p>
              </li>
              <li>
                <div className="socialNetwork">
                  <div className="cube">
                    <img
                      src={require("./images/facebook-f-brands.png")}
                      alt="facebook-f-brands"
                    />
                  </div>
                  <div className="cube">
                    <img
                      src={require("./images/instagram-brands.png")}
                      alt="instagram-brands"
                    />
                  </div>
                  <div className="cube">
                    <img
                      src={require("./images/twitter-brands.png")}
                      alt="twitter-brands"
                    />
                  </div>
                </div>
              </li>
              <li>
                <p>+7 (495) 685-53-53</p>
                <p>sitronicsgroup@mail.ru</p>
                <p>г. Тюмень</p>
              </li>
            </ul>
          </div>
        </footer>
      </Provider>
    </Router>
  );
};
