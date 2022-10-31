import logo from "./../imgs/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/Auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {setPlanInfo, setUserInfo} = useContext(UserContext)





    function log(a){
        console.log(a)
    }


    function handleSubmit(e){
        e.preventDefault();
        const body = {
            email: email,
            password: password}


        axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login",
                    body)
                .then((response) => {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userInfo", response.data);
                    if(response.data.membership){
                      navigate("/home")
                      setPlanInfo(response.data.membership)
                      
                    }else{
                      
                      navigate("/subscriptions")
                    }
                    
                })
                .catch((e) => {
                    alert(e)
                })
    }


    if(localStorage.getItem("userInfo")){
      if(localStorage.getItem("userInfo").membership){
        setPlanInfo({...localStorage.getItem("userInfo").membership})
        setUserInfo({...localStorage.getItem("userInfo")})
        navigate("/home")
        
      }else{
        
        navigate("/subscriptions")
      }
    }




  return (
    <StyledLogin>
      <img src={logo} />
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="e-mail" name="email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
        <button>Entrar</button>
      </form>
      <Link to="/sign-up">Não possuí uma conta? Cadastre-se</Link>
    </StyledLogin>
  );
}

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top:135px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top:100px;
    margin-bottom:25px;
  }

  input {
    background-color: #ffffff;
    border-radius: 8px;
    width: 300px;
    height: 52px;
    padding-left: 15px;
 

    color: #7e7e7e;
  }

  input::placeholder {
    padding-left: 15px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
  }

  button {
    border-radius: 8px;
    width: 300px;
    height: 52px;
    font-weight:700;
    background-color: #ff4791;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
  }
`;
