import React from "react";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth, db } from "../../firebase/firebase";
import { getAuth, updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import styled from "styled-components";
import { Input, Button, CardHeader, Card } from "../../styles/StyledComponent";

const Container = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Settings = () => {

    const {currentUser} = useContext(AuthContext)

    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [reNewPass, setReNewPass] = useState('')

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangePass = (e) => {
        setPass(e.target.value)
    }

    const handleChangeNewPass = (e) => {
        setNewPass(e.target.value)
    }

    const handleChangeReNewPass = (e) => {
        setReNewPass(e.target.value)
    }

    const handleUpdateName = () => {
        updateProfile(getAuth().currentUser, {
            displayName: name
        })
        .then(async () => {
            if (name.length > 2) {
                await updateDoc(doc(db, 'users', currentUser.uid), {
                    displayName: name
                });
                currentUser.displayName = name
                setName('')
                alert('Имя успешно изменено. Страница будет перезагружена')
                window.location.reload()
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleUpdatePassword = () => {
        setError('')
        if (newPass === reNewPass) {
            const credential = EmailAuthProvider.credential(
                getAuth().currentUser.email,
                pass
            )
            reauthenticateWithCredential(
                currentUser,
                credential
            ).then(
                updatePassword(auth.currentUser, newPass)).catch((error) => {
                setError(error.message)
            })
        } else {
            setError('Новые пароли не совпадают')
        }
    }

    return(
        <>
            <h1>Настроить профиль</h1>
            {/* <Card>
                <CardHeader>Выбрать фотографию профиля</CardHeader>
            </Card> */}
            <Card >
                <CardHeader>Изменить имя</CardHeader>
                <Container >
                    <Input type="text" value={name} placeholder="Введите новое имя" onChange={handleChangeName} autoComplete="new-password" />
                    <Button type="submit" onClick={handleUpdateName}>Применить</Button>
                </Container>
            </Card>
            <Card >
                <CardHeader>Сменить пароль</CardHeader>
                <Container >
                    <Input type="password" value={pass} placeholder="Введите пароль" onChange={handleChangePass} autoComplete="new-password"/>
                    <Input type="password" value={newPass} placeholder="Введите новый пароль" onChange={handleChangeNewPass} autoComplete="new-password"/>
                    {error && <span className="signupError" style={{top: '50px', fontSize: '15px', height: '10px'}}>{error}</span>}
                    <Input type="password" value={reNewPass} placeholder="Повторите новый пароль" onChange={handleChangeReNewPass} autoComplete="new-password"/>
                    <Button type="submit" onClick={handleUpdatePassword}>Применить</Button>
                </Container>
            </Card>
        </>
        
    )
}