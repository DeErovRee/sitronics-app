import React, { useState } from "react";
import { auth, storage } from "../firebase/firebase";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Button, Checkbox, Container, Error, Form, H3, Input, Label, LoginStyled, P } from "./loginPage";

export const SignupPage = () => {
  const [displayName, setDisplayName] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [isProvider, setIsProvider] = useState(false);

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
    setIsProvider(!isProvider);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById('form')
    if (!displayName) {
      setError("Введите имя");
      return;
    }
    if (!email) {
      setError("Введите email");
      return;
    }
    if (!password) {
      setError("Введите пароль");
      return;
    }
    if (password !== rePassword) {
      setError("Пароли не совпадают");
      return;
    }

    const res = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      setError('')
      setError(`${error.message}`);
    });

    const date = new Date().getTime();
    const storageRef = ref(storage, `${displayName + date}`);

    await uploadBytesResumable(storageRef, file)
      .then(() => {
        getDownloadURL(storageRef)
          .then(async (downloadURL) => {
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
              });

              await setDoc(doc(db, "userChats", res.user.uid), {});
              
              if(isProvider) {
                await setDoc(doc(db, 'userReviews', res.user.uid), {})
                await setDoc(doc(db, 'providerPages', res.user.uid), {
                  ratingValue: 3,
                })
              }
            } catch (error) {
              setError('')
              setError(`${error.message}`);
            }
          })
          .catch((error) => {
            setError('')
            setError(`${error.message}`);
          });
      })
      .catch((error) => {
        setError('')
        setError(`${error.message}`);
      });
  };

  return(
    <LoginStyled>
      <Form onSubmit={handleSubmit} id='form'>
        <H3>Создайте аккаунт</H3>
        <P>И получите доступ ко всем услугам нашего сервиса</P>
        <Input
          type="name"
          placeholder="Введите имя"
          onChange={handleNameChange}
          value={displayName}
          />
        <Input
          type="email"
          placeholder="Введите свой email"
          onChange={handleEmailChange}
          value={email}
        />
        <Input
          type="password"
          placeholder="Введите пароль"
          onChange={handlePassChange}
          value={password}
        />
        <Input
          type="password"
          placeholder="Повторите пароль"
          onChange={handleRePassChange}
          value={rePassword}
        />
          <Input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={handleFileChange}
          />
          <Label htmlFor="file" className="input">
            <img
              style={{ width: "25px" }}
              src="https://cdn-icons-png.flaticon.com/512/1091/1091916.png"
              alt=""
            />
            Добавьте аватар
          </Label>
        <Label>
          <Checkbox
            type="checkbox"
            id="provider"
            onChange={handleIsProviderChange}
          />
          Я поставщик услуг
        </Label>
        {error && <Error bottom={'18.5%'}>{error}</Error>}
        <Button cursor={'pointer'} type="submit">
          Создать аккаунт
        </Button>
        <P>
          <Link to="/login">У меня есть аккаунт</Link>
        </P>
        <P>или войдите с помощью</P>
        <Container justifyContent={'center'}>
            <img src={require("../images/google_logo.png")} alt="google_logo" />
          
            <img src={require("../images/vk_logo.png")} alt="vk_logo" />
            <img
              src={require("../images/microsoft_logo.png")}
              alt="microsoft_logo"
            />
        </Container>
      </Form>
    </LoginStyled>
  )
}
