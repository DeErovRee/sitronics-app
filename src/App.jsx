import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { ServicesPage } from "./pages/servicesPage";
import { MainPage } from "./pages/mainPage";
import { DronsPage } from "./pages/dronsPage";
import { LoginPage } from "./pages/loginPage";
import { SignupPage } from "./pages/signupPage";
import { PersonalAreaPage } from "./pages/personalAreaPage";
import { Page404 } from "./pages/page404";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

import { PublicRoute } from "./hocs/publicRoute";
import { PrivateRoute } from "./hocs/privateRoute";

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
    const logout = async () => {
      try {
        await auth.signOut();
      } catch (error) {
        console.log(error);
      }
    };

    return authed ? (
      <button onClick={logout}>Logout</button>
    ) : (
      <li>
        <Link to="/login">Login</Link>
      </li>
    );
  };

  useEffect(() => {
    AuthedCheck();
  }, []);

  return (
    <Router>
      <header>
        <nav>
          <ul className="header">
            <li>
              <Link to="/">
                <img
                  className="logo"
                  src="https://cdn-icons-png.flaticon.com/512/2646/2646459.png"
                  alt="logo"
                />
              </Link>
            </li>
            <li>
              <Link to="/drons">Дроны</Link>
            </li>
            <li>
              <Link to="/services">Услуги</Link>
            </li>
            <li>
              <Link to="/personalArea">Личный кабинет</Link>
            </li>
            <Component />
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/drons" element={<DronsPage />} />
          <Route exact path="/services" element={<ServicesPage />} />
          <Route
            exact
            path="/personalArea"
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
        </Routes>
      </main>
    </Router>
  );
};
