import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      switch (error.message) {
        case "Firebase: Error (auth/user-not-found).":
          setError("Неверный логин и/или пароль");
          break;
        case "Firebase: Error (auth/invalid-email).":
          setError("Пользователя с таким email не существует");
          break;
        case "Firebase: Error (auth/wrong-password).":
          setError("Неверный логин и/или пароль");
          break;
        default:
          setError("");
      }
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setError(
        "На вашу почту отправлено письмо, c инструкцией по восстановлению пароля"
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit} className="loginForm">
        <h3>Войдите в аккаунт</h3>
        <h4>И получите доступ ко всем услугам нашего сервиса</h4>
        <input
          className="input"
          type="email"
          placeholder="Введите свой email"
          name="email"
          onChange={handleEmailChange}
          value={email}
        />
        <input
          className="input"
          type="password"
          placeholder="Введите свой пароль"
          name="password"
          onChange={handlePassChange}
          value={password}
        />
        {error && <p className="loginError">{error}</p>}
        <button className="input" type="submit">
          Войти
        </button>
        <div className="restore">
          <button className="forgotPassword" onClick={handleForgotPassword}>
            Не помню пароль
          </button>
          <p>
            <Link to="/signup">Создать аккаунт</Link>
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
};
