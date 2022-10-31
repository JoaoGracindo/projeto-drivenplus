import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import UserContext from "./../contexts/Auth"
import React from "react";

function Modal({ name, price }) {
  return (
    <StyledModal>
      <p>
        Tem certeza que deseja assinar o plano {name} ({price})?
      </p>
      <button>Não</button>
      <button>Sim</button>
    </StyledModal>
  );
}


const StyledModal = styled.div`
  width: 248px;
  height: 210px;
  background: #ffffff;
  border-radius: 12px;
`;







export default function Plano() {
  const [plano, setPlano] = useState([]);
  const idPlano = useParams();
  const {setPlanInfo} = useContext(UserContext);
  const navigate = useNavigate();
  const [cardInfo, setCardInfo] = useState({
    membershipId: 0,
    cardName: "",
    cardNumber: "",
    securityNumber: 0,
    expirationDate: ""
  })
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };






  function handleSubmit(e){
    e.preventDefault();

    axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",
                cardInfo,
                config)
         .then((e) => {
            setPlanInfo({...e.data});
            navigate("/home")
         })
         .catch((e) => {
            alert(e)
         })
  }








  useEffect(() => {
    axios
      .get(
        `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlano}`,
        config
      )
      .then((response) => {
        setPlano([...response.data]);
      });
  }, []);

  if (!plano) {
    return <></>;
  }

  return (
    <>
    <Link to="/subscriptions"><ion-icon name="arrow-back-outline"></ion-icon></Link>
      <img src={plano.image}/>
      <div>
        <img/>
        <h4>Benefícios:</h4>
      </div>

      <ul>
        {plano.perks.map((p) => (
          <li>{p.title}</li>
        ))}
      </ul>
      <p></p>
      <div>
        <img/>
        <h4>Preço</h4>
      </div>
      <p>{plano.price}</p>



      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setCardInfo({...cardInfo, cardName: e.target.value})} type="name" placeholder="Nome impresso no cartão" name="name"/>
        <input onChange={(e) => setCardInfo({...cardInfo, cardNumber:e.target.value})} placeholder="Digitos do cartão"/>
        <div>
            <input onChange={(e) => setCardInfo({...cardInfo, securityNumber:e.target.value})} placeholder="Código de segurança"/>
            <input onChange={(e) => setCardInfo({...cardInfo, expirationDate:e.target.value})} type="date" placeholder="Validade" name="date"/>
        </div>
        <button>ASSINAR</button>
      </form>
    </>
  );
}
