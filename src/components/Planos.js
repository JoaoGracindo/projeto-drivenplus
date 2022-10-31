import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Planos() {
  const [planos, setPlanos] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

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
      {planos.map((p) => 
        <div key={p.id}>
          <img src={p.image} />
          <p>{p.price}</p>
        </div>
      )}
    </StyledPlanos>
  );
}

const StyledPlanos = styled.div`
  h1 {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    color: #ffffff;
  }

  & > div {
    width: 290px;
    height: 180px;
    border: 3px solid #7e7e7e;
    background-color:white;
    border-radius: 12px;
  }
`;
