import { Route, BrowserRouter, Routes } from "react-router-dom";
import UserContext from "./contexts/Auth"
import Login from "./components/Login";
import { createGlobalStyle } from "styled-components";
import Cadastro from "./components/Cadastro";
import Planos from "./components/Planos";
import Plano from "./components/Plano";
import Home from "./components/Home";
import { useState } from "react";

export default function App() {
  const [planInfo, setPlanInfo] = useState({})
  const [userInfo, setUserinfo] = useState({})

  return (
    <BrowserRouter>
      <GlobalStyle />
      <UserContext.Provider value={{planInfo, setPlanInfo, userInfo, setUserinfo}}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Cadastro />}/>
          <Route path="/subscriptions" element={<Planos/>}/>
          <Route path="/subscriptions/:idPlano" element={<Plano/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

const GlobalStyle = createGlobalStyle`

  html{
    background-color:#0e0e13;
  }

  *{
    box-sizing:border-box;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;

  }
`;
