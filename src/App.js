import { Route, BrowserRouter, Routes } from "react-router-dom";
import styled from "styled-components";
import UserContext from "./contexts/Auth";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
    <UserContext.Provider value={"joao"}>
    <Routes>
      <Route path="/" element={<Login/>}/>
    </Routes>
    </UserContext.Provider>
    </BrowserRouter>
    

    
  );
}

export default App;
