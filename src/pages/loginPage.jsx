import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import styled from 'styled-components'

export const LoginStyled = styled.div`
  background-color: white;
  background-image: linear-gradient(45deg, rgba(241, 2, 2, 0.61), rgba(0, 8, 255, 0.61));
  display: flex;
  justify-content: center;
`

export const Form = styled.form`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 66px 38px;
  margin: 20px 0;
  border-radius: 80px;
  background-color: #f2f2f2;
  max-width: 642px;

  @media ${props => props.theme.media.tablet} {
    
  }

  @media ${props => props.theme.media.phone} {
    border-radius: 0;
    margin: 0;
    padding: 40px;
  }
`

export const H3 = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  margin-bottom: 22.26px;
`

export const P = styled.p`
  line-height: 24px;
  padding-bottom: 25.72px;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  cursor: ${props => props.cursor || 'auto'};
  color: ${props => props.color || 'auto'};

  a {
    text-decoration: none;
    color: inherit;
    font-weight: inherit;
  }
`

export const Input = styled.input`
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  border: none;
  border-radius: 10px;
  background-color: #ffffff;
  margin: 0 0 20px;
  padding: 0 42px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
`

export const Checkbox = styled.input`
  margin: 0 20px 0 5px;
  -ms-transform: scale(2);
  -moz-transform: scale(2);
  -webkit-transform: scale(2);
  -o-transform: scale(2);
  transform: scale(2);
`

export const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  border: none;
  border-radius: 10px;
  background-color: #ffffff;
  margin: 0 0 20px;
  padding: 0 42px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;

  img {
    margin: 0 10px 0 0;
  }
`

export const Button = styled.button`
  width: 100%;
  height: 70px;
  border: none;
  border-radius: 10px;
  background-color: #ffffff;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  margin: 0 0 40px;
  cursor: pointer;
  color: #000842;
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justifyContent || 'space-between'};
  width: 100%;

  img {
    margin: 5px;
    cursor: pointer;
  }
`

export const Error = styled.p`
  text-transform: uppercase;
  font-weight: 900;
  width: 100%;
  color: #ff0000;
  margin-bottom: 0px;
  position: absolute;
  bottom: ${props => props.bottom || '29%'};
  left: 0;
  text-align: center;
`

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePassChange = (e) => {
    setError('');
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setError('');
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
    <LoginStyled>
      <Form onSubmit={handleSubmit}>
        <H3>Войдите</H3>
        <P color={'#000842'}>И получите доступ ко всем услугам нашего сервиса</P>
        <Input 
          type='email' 
          placeholder='Введите свой email' 
          value={email}
          onChange={handleEmailChange} />
        <Input 
          type='password' 
          placeholder='Введите свой пароль' 
          value={password}
          onChange={handlePassChange} />
        {error && <Error>{error}</Error>}
        <Button type='submit'>Войти</Button>
        <Container>
          <P 
            color={'#000842'} 
            cursor={'pointer'} 
            onClick={handleForgotPassword}>Не помню пароль</P>
          <P 
            color={'#000842'} 
            cursor={'pointer'}>
            <Link to="/signup">Создать аккаунт</Link>
          </P>
        </Container>
        <P>Или войдите с помощью</P>
        <Container justifyContent={'center'}>
          <img src={require("../images/google_logo.png")} alt="" />
          <img src={require("../images/vk_logo.png")} alt="" />
          <img src={require("../images/microsoft_logo.png")} alt="" />
        </Container>
      </Form>
    </LoginStyled>
  );
};
