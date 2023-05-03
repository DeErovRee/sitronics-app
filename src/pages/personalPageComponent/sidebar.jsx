import React, { useContext, useEffect } from "react"
import { auth, db } from "../../firebase/firebase"
import { AuthContext } from "../../context/AuthContext"
import { doc, onSnapshot } from "firebase/firestore";

import { Link } from "react-router-dom";
import { useState } from "react";

export const Sidebar = () => {
    const { currentUser } = useContext(AuthContext)
    const [ provider, setProvider ] = useState()

    useEffect(() => {
        const unsub =  onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
          doc.exists() && setProvider(doc.data().isProvider);
        });
    
        return()=>{
          unsub()
        }
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
          
            {provider ? <p className="userStatus provider">Поставщик услуг</p> : <p className="userStatus client">Клиент</p>}
            <Link to="ordersAll">Заявки</Link>
            <Link to="orders">Текущие заказы</Link>
            <Link to="ordersHistory">История заказов</Link>
            <Link to="settings">Настроить профиль</Link>
           
            {provider && <Link to="providerButton">Кнопка поставщика</Link>}
            <button onClick={logout}>Выйти</button>
        </div>
    )
}