import React from "react";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth, db } from "../../firebase/firebase";
import { getAuth, updateProfile, updatePassword, updateCurrentUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

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
        <div className="settings">
            <h1>Настроить профиль</h1>
            <div className="defaultDiv">
                <p>Выбрать фотографию профиля</p>
            </div>
            <div className="defaultDiv" >
                <p>Изменить имя</p>
                <div className="wrappable" >
                    <input type="text" value={name} placeholder="Введите новое имя" onChange={handleChangeName}/>
                    <button type="submit" onClick={handleUpdateName}>Применить</button>
                </div>
            </div>
            <div className="defaultDiv" >
                <p>Сменить пароль</p>
                <div className="wrappable" >
                    <input type="password" value={pass} placeholder="Введите пароль" onChange={handleChangePass}/>
                    <input type="password" value={newPass} placeholder="Введите новый пароль" onChange={handleChangeNewPass}/>
                    {error && <span className="signupError" style={{top: '50px', fontSize: '15px', height: '10px'}}>{error}</span>}
                    <input type="password" value={reNewPass} placeholder="Повторите новый пароль" onChange={handleChangeReNewPass}/>
                    <button type="submit" onClick={handleUpdatePassword}>Применить</button>
                </div>
            </div>
        </div>
        
    )
}