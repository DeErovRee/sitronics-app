import "./App.scss";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

import { PublicRoute } from "./hocs/publicRoute";
import { PrivateRoute } from "./hocs/privateRoute";
import { ContactsPage } from "./pages/contactsPage";
import { Header } from "./pages/Header";
import { Footer } from "./pages/Footer"

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

  useEffect(() => {
    AuthedCheck();
  }, []);

  return (
    <Router>
        <Header authenticated={authed}/>
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
      <Footer />
    </Router>
  );
};
