import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

const Global = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizinig: border-box;
  font-family: Unbounded;

  /* Скрываем scrollbar для IE, Edge и Firefox */
  -ms-overflow-style: none; /* IE и Edge */
  scrollbar-width: none; /* Firefox */

  /* Скрываем scrollbar для Chrome, Safari и Opera */
  &::-webkit-scrollbar {
    display: none;
  }
}
`

const theme = {
  colors: {
    primary: '#1E1E1E',
    gradient: 'linear-gradient(45deg, rgba(241, 2, 2, 0.61), rgba(0, 8, 255, 0.61))',
  },
  media: {
    phone: '(max-width: 425px)',
    tablet: '(max-width: 769px)',
    desktop: '(min-width: 769px)'
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <ThemeProvider theme={theme}>
        {/* <React.StrictMode> */}
          <Global />
          <App />
        {/* </React.StrictMode> */}
      </ThemeProvider>
      
    </ChatContextProvider>
  </AuthContextProvider>
);
