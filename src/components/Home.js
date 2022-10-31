import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/Auth";

export default function Home() {
  const { planInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  function handleCancel() {
    axios
      .delete(
        "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",
        config
      )
      .then(() => {
        navigate("/subscriptions");
      });
  }

  function handleChange() {
    navigate("/subscriptions");
  }

  return (
    <StyledHome>
      <div className="header">
        <img src={planInfo.image} />
        <ion-icon name="person-circle"></ion-icon>
        
      </div>
      <p>Olá, {userInfo.name}</p>

      <div className="perks">
        {planInfo.perks.map((p) => (
          <Link to={p.link}>
            <div className="perk">{p.title}</div>
          </Link>
        ))}
      </div>

      <div>
        <button className="change" onClick={handleChange}>
          Mudar plano
        </button>
        <button className="cancel" onClick={handleCancel}>
          Cancelar plano
        </button>
      </div>
    </StyledHome>
  );
}

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .header{
    display:flex;
    justify-items:space-between;
    align-items:center;
    margin-left:5%;
    margin-right:5%;
  }

  p{
    margin: 0 auto;

  }


  .perks{
    margin-top:50px;
    padding:8px;

  }

  .cancel {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 299px;
    height: 52px;
    background-color: #ff4747;
    border-radius: 8px;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 10px;
    color: #ffffff;
  }

  .perk,
  .change {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 299px;
    height: 52px;
    background-color: #ff4791;
    border-radius: 8px;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 10px;
    color: #ffffff;
  }
`;
