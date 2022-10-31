import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Planos() {
  const [planos, setPlanos] = useState([]);
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  function handleClick(id) {
    navigate(`/subscriptions/${id}`);
  }

  useEffect(() => {
    axios
      .get(
        "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships",
        config
      )
      .then((response) => {
        setPlanos([...response.data]);
      });
  }, []);

  if (!planos) {
    return "";
  }
  return (
    <StyledPlanos>
      <h1>Escolha seu Plano</h1>
      {planos.map((p) => (
        <div onClick={() => handleClick(p.id)} key={p.id}>
          <img src={p.image} />
          <p>R$ {p.price}</p>
        </div>
      ))}
    </StyledPlanos>
  );
}

const StyledPlanos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    color: #ffffff;
  }

  & > div {
    width: 290px;
    height: 180px;
    background-color: #0e0e13;
    border: 3px solid #7e7e7e;
    border-radius: 12px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top:20px;

    p {
      font-weight: 700;
      font-size: 24px;
      line-height: 28px;
      color: #ffffff;
    }
  }
`;
