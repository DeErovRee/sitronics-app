import React, { useContext } from "react"
import { auth } from "../../firebase/firebase"
import { AuthContext } from "../../context/AuthContext"

import { Link } from "react-router-dom";

import styled from 'styled-components'
import { UserImg } from "../chatComponent/search";

const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 200px;
  align-items: center;
`

const UserPhoto = styled(UserImg)`
  width: 120px;
  height: 120px;
`

const UserData = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 28px;
  margin: 12px 0 0;
  color: white;
`

const UserName = styled(UserData)`
  text-transform: capitalize;
`

const UserEmail = styled(UserData)`
  cursor: pointer;
`

const Provider = styled.div`
  text-align: center;
  margin: 9px 0;
  background-color: rgb(141, 164, 241);
  color: white;
  padding: 15px;
  border-radius: 5px;
`

const Client = styled(Provider)`
  background-color: red;
`

const Links = styled(Link)`
  box-sizing: border-box;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  border: none;
  border-radius: 10px;
  background-color: white;
  max-width: 180px;
  width: 100%;
  padding: 5px 0px;
  margin: 8px 0;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  color: #000000;
`

export const Sidebar = () => {
    const { currentUser } = useContext(AuthContext)

    const logout = async () => {
        try {
          await auth.signOut();
        } catch (error) {
        }
    };

    return(
        <SidebarStyled>
            <UserPhoto src={currentUser.photoURL} alt="" />
            <UserName>{currentUser.displayName}</UserName>
            <UserEmail onClick={()=> window.location = `mailto:${currentUser.email}`}>{currentUser.email}</UserEmail>
          
            {currentUser.isProvider ? <Provider><p>Поставщик услуг</p></Provider> : <Client>Клиент</Client>}
            <Links to="ordersAll">Заказы</Links>
            <Links to="ordersHistory">История заказов</Links>
            <Links to="settings">Настроить профиль</Links>
           
            {currentUser.isProvider && <Links to="providerButton">Кнопка поставщика</Links>}
            <Links onClick={logout}>Выйти</Links>
        </SidebarStyled>
    )
}