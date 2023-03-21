import React, { useState } from "react";
import { auth, storage } from "../firebase/firebase";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const SignupPage = () => {
  const [displayName, setDisplayName] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null)
  const [isProvider, setIsProvider] = useState(false)

  const handleNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleRePassChange = (e) => {
    setRePassword(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleIsProviderChange = (e) => {
    setIsProvider(!isProvider)
  }

  const handleFileChange = (e) => {
    setFile(e.target.file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!displayName) {
      setError('Введите имя')
      return
    } 
    if (!email) {
      setError('Введите email')
      return
    }
    if (!password) {
      setError('Введите пароль')
      return
    } 
    if (password !== rePassword) {
      setError('Пароли не совпадают')
      return
    }

    // console.log(displayName)
    // console.log(email)
    // console.log(password)
    // console.log(isProvider)
    
        const res = await createUserWithEmailAndPassword(auth, email, password).catch(error => {
          console.log(error.code)
          switch (error.code) {
              case "auth/email-already-in-use":
                setError("Данный email уже используется")
              case "auth/weak-password":
                setError("Слабый пароль")
            }
        });

        console.log(res.user)

        const date = new Date().getTime()
        const storageRef = ref(storage, `${displayName + date}`);

        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateProfile(res.user, {
                displayName,
                isProvider,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                isProvider,
                photoURL: downloadURL,
              })
            } catch (err) {
              setError(err)
              
            }
          }).catch(error => {
            setError(error)
          })
        }).catch(error => {
          setError(error)
        })
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit} className="loginForm">
        <h3>Зарегестрируйтесь</h3>
        <h4>И получите доступ ко всем услугам нашего сервиса</h4>
        <div>
          <input
            className="input"
            type="name"
            placeholder="Name"
            name="name"
            onChange={handleNameChange}
            value={displayName}
          />
        </div>
        <div>
          <input
            className="input"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleEmailChange}
            value={email}
          />
        </div>
        <div>
          <input
            className="input"
            type="password"
            placeholder="password"
            name="password"
            onChange={handlePassChange}
            value={password}
          />
        </div>
        <div>
          <input
            className="input"
            type="password"
            placeholder="repeat password"
            name="RePassword"
            onChange={handleRePassChange}
            value={rePassword}
          />
        </div>
        <div>
          <input
            className="input"
            type="file"
            placeholder="repeat password"
            name="file"
            id="file"
            onChange={handleFileChange}
            value={file}
          />
          <label htmlFor="file">
            <img src="../" alt="" />
          </label>
        </div>
        <div className="input checkbox">
          <input type="checkbox" name="provider" id="provider" onChange={handleIsProviderChange}/>
          <p>Я поставщик услуг</p>
          <p></p>
        </div>
        {error && <p className="signupError">{error}</p>}
        <button className="input" type="submit">
          Зарегестрироваться
        </button>
        <div className="restore">
          <p>
            <Link to="/login">У меня есть аккаунт</Link>
          </p>
        </div>
        <p>или войдите с помощью</p>
        <ul className="socialNetwork">
          <li>
            <img src={require("../images/google_logo.png")} alt="google_logo" />
          </li>
          <li>
            <img src={require("../images/vk_logo.png")} alt="vk_logo" />
          </li>
          <li>
            <img
              src={require("../images/microsoft_logo.png")}
              alt="microsoft_logo"
            />
          </li>
        </ul>
      </form>
    </div>
  );
  }
