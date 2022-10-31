import { Route, BrowserRouter, Routes } from "react-router-dom";
import UserContext from "./contexts/Auth"
import Login from "./components/Login";
import { createGlobalStyle } from "styled-components";
import Cadastro from "./components/Cadastro";
import Planos from "./components/Planos";
import Plano from "./components/Plano";
import Home from "./components/Home";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <UserContext.Provider value={"joao"}>
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
