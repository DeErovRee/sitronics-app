import '../src/styles/App.scss'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ServicesPage } from './pages/servicesPage'
import { MainPage } from './pages/mainPage'
import { DronsPage } from './pages/dronsPage'
import { LoginPage } from './pages/loginPage'
import { SignupPage } from './pages/signupPage'
import { PersonalAreaPage } from './pages/personalAreaPage'
import { Page404 } from './pages/page404'
import { ChatsPage } from './pages/chatsPage'
import { ServicePage } from './pages/servicePage'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebase'

import { PublicRoute } from './hocs/publicRoute'
import { PrivateRoute } from './hocs/privateRoute'
// import { ContactsPage } from "./pages/contactsPage";
import { Header } from './pages/Header'
import { Footer } from './pages/Footer'
import { DronPage } from './pages/dronesComponent/DronPage'
import styled from 'styled-components'

const RunLine = styled.marquee`
    position: sticky;
    font-weight: 900;
    background-color: orange;
    margin: 0 0 -5px;
    font-size: 25px;
    padding: 5px;
    top: 0px;
    z-index: 100;
`

export const App = () => {
    const [authed, setAuthed] = useState(false)

    const AuthedCheck = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthed(true)
            } else {
                setAuthed(false)
            }
        })
    }

    useEffect(() => {
        AuthedCheck()
    }, [])

    return (
        <Router>
            <RunLine>Сайт находится в стадии разработки! Отправленные заявки рассмотрены не будут!</RunLine>
            <Header authenticated={authed} />
            <main>
                <Routes>
                    <Route exact path='/' element={<MainPage />} />
                    <Route exact path='/drons' element={<DronsPage />} />
                    <Route exact path='/services' element={<ServicesPage />} />
                    {/* <Route exact path="/contacts" element={<ContactsPage />} /> */}
                    <Route
                        exact
                        path='/chats'
                        element={
                            <PrivateRoute authenticated={authed}>
                                <ChatsPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact
                        path='/personalArea/*'
                        element={
                            <PrivateRoute authenticated={authed}>
                                <PersonalAreaPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        authenticated={authed}
                        exact
                        path='/login'
                        element={
                            <PublicRoute authenticated={authed}>
                                <LoginPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        authenticated={authed}
                        exact
                        path='/signup'
                        element={
                            <PublicRoute authenticated={authed}>
                                <SignupPage />
                            </PublicRoute>
                        }
                    />
                    <Route exact path='*' element={<Page404 />} />
                    <Route exact path='services/*' element={<ServicePage />} />
                    <Route exact path='drons/*' element={<DronPage />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    )
}
