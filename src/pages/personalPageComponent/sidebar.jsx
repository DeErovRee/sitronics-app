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

  @media (max-width: 950px) {
    margin-left: 12px;
  }

  @media (max-width: 625px) {
    margin-left: 0;
    max-width: none;
  }
`

const UserPhoto = styled.img`
  width: 100%;
  height: auto;

  @media (max-width: 625px) {
    width: 300px;
    height: auto;
  }
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

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 10px;
  background-color: white;
  width: 200px;
  height: 50px;
  padding: 5px 0px;
  margin: 8px 0 0;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  color: #000000;

  @media (max-width: 625px) {
    margin: 10px;
  }
`

const OptionButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 625px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
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
            <OptionButtons>
              <Links to="ordersAll">Заказы</Links>
              <Links to="ordersHistory">История заказов</Links>
              <Links to="settings">Настроить профиль</Links>
              {currentUser.isProvider && <Links to="providerButton">Кнопка поставщика</Links>}
              <Links onClick={logout}>Выйти</Links>
            </OptionButtons>
            
        </SidebarStyled>
    )
}