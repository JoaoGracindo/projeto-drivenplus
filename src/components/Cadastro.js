import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Cadastro() {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();




    function log(a){
        console.log(a)
    }


    function handleSubmit(e){
        e.preventDefault();
        const body = {
            email: email,
            name: name,
            cpf: cpf,
            password: password
        };

        log(body)


        axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up",body)
             .then((e) => {
                navigate("/");
                log(e)
             })
             .catch((e) => {
                log(e)
             })
    }









  return (
    <StyledCadastro>
      <form onSubmit={handleSubmit}>
        <input type="name" placeholder="Nome" name="name" onChange={(e) => setName(e.target.value)}/>
        <input type="cpf" placeholder="CPF" name="cpf" onChange={(e) => setCpf(e.target.value)}/>
        <input type="email" placeholder="e-mail" name="email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
        <button>CADASTRAR</button>
      </form>
      <Link to="/">Já possuí uma conta? Entre</Link>
    </StyledCadastro>
  );
}

const StyledCadastro = styled.div`
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
`
