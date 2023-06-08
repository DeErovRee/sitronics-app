import React, { useContext, useEffect } from "react"
import { auth, db } from "../../firebase/firebase"
import { AuthContext } from "../../context/AuthContext"
import { doc, onSnapshot } from "firebase/firestore";

import { Link } from "react-router-dom";
import { useState } from "react";

import styled from 'styled-components'

const Provider = styled.div`
  margin: 9px 0;
  background-color: rgb(141, 164, 241);
  color: white;
  padding: 15px;
  border-radius: 5px;
`

const Client = styled(Provider)`
  background-color: red;
`

export const Sidebar = () => {
    const { currentUser } = useContext(AuthContext)
    const [ isProvider, setIsProvider ] = useState()

    useEffect(() => {
        const unsub =  onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
          doc.exists() && setIsProvider(doc.data().isProvider);
        });
    
        return()=>{
          unsub()
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = async () => {
        try {
          await auth.signOut();
        } catch (error) {
        }
    };

    return(
        <div className="personalSidebar">
            <img src={currentUser.photoURL} alt="" width='65px' className="userPhoto" />
            <p className="userName">{currentUser.displayName}</p>
            <p className="userEmail" onClick={()=> window.location = `mailto:${currentUser.email}`}>{currentUser.email}</p>
          
            {isProvider ? <Provider><p>Поставщик услуг</p></Provider> : <Client>Клиент</Client>}
            <Link to="ordersAll">Заказы</Link>
            <Link to="ordersHistory">История заказов</Link>
            <Link to="settings">Настроить профиль</Link>
           
            {isProvider && <Link to="providerButton">Кнопка поставщика</Link>}
            <button onClick={logout}>Выйти</button>
        </div>
    )
}