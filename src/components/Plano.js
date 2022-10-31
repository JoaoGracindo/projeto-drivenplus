import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import UserContext from "./../contexts/Auth";
import React from "react";
import beneficio from "./../imgs/beneficio.svg";
import preco from "./../imgs/preco.svg";

function Modal({ name, price, closeModal, handleSubmit }) {
  return (
    <StyledModal>
      <div className="modalContainer">
        <button className="x" onClick={() => closeModal(false)}>
          {" "}
          X{" "}
        </button>
        <div className="title">
          <p>
            Tem certeza que deseja assinar o plano {name} ({price})?
          </p>
        </div>
        <div className="buttons">
          <button className="cancel" onClick={() => closeModal(false)}>
            Não
          </button>
          <button className="confirm" onClick={handleSubmit}>
            Sim
          </button>
        </div>
      </div>
    </StyledModal>
  );
}

const StyledModal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  .modalContainer {
    width: 248px;
    height: 210px;
    background-color: #ffffff;
    border-radius: 12px;
  }

  .title {
    text-align: center;
    color: #000000;
    p {
      font-weight: 700;
      font-size: 18px;
      line-height: 21px;
    }
  }

  .cancel {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95px;
    height: 52px;
    background-color: #cecece;
    border-radius: 8px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

    color: #ffffff;
  }

  .confirm {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95px;
    height: 52px;
    background: #ff4791;
    border-radius: 8px;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
  }

  .x {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 20px;
    top: 25px;
  }

  .buttons {
    display: flex;
    margin-top: 47px;

    button {
      margin-left: 20px;
    }
  }
`;

export default function Plano() {
  const [plano, setPlano] = useState({});
  const [perks, setPerks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { idPlano } = useParams();
  const { setPlanInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [cardInfo, setCardInfo] = useState({
    membershipId: 0,
    cardName: "",
    cardNumber: "",
    securityNumber: 0,
    expirationDate: "",
  });
  console.log(cardInfo);
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",
        cardInfo,
        config
      )
      .then((e) => {
        setPlanInfo({ ...e.data });
        navigate("/home");
      })
      .catch((e) => {
        alert(e);
      });
  }

  useEffect(() => {
    axios
      .get(
        `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlano}`,
        config
      )
      .then((response) => {
        setPlano({ ...response.data });
        setPerks([...response.data.perks]);
      });
  }, []);

  if (!plano) {
    return <></>;
  }

  return (
    <StyledPlano>
      <Link to="/subscriptions">
        <ion-icon name="arrow-back-outline"></ion-icon>
      </Link>
      <img src={plano.image} />
      <div className="beneficio">
        <img src={beneficio} />
        <div>Benefícios:</div>
        <ol>
          {perks.map((p) => (
            <li>{p.title}</li>
          ))}
        </ol>
      </div>

      <div className="preco">
        <div>
          <img src={preco} />
          <h4>Preço:</h4>
        </div>

        <p>{plano.price} cobrado mensalmente</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpenModal(true);
        }}
      >
        <input
          onChange={(e) =>
            setCardInfo({ ...cardInfo, cardName: e.target.value })
          }
          type="name"
          placeholder="Nome impresso no cartão"
          name="name"
        />
        <input
          onChange={(e) =>
            setCardInfo({ ...cardInfo, cardNumber: e.target.value })
          }
          placeholder="Digitos do cartão"
        />
        <div>
          <input
            onChange={(e) =>
              setCardInfo({ ...cardInfo, securityNumber: e.target.value })
            }
            placeholder="Código de segurança"
          />
          <input
            onChange={(e) =>
              setCardInfo({ ...cardInfo, expirationDate: e.target.value })
            }
            placeholder="Validade"
            name="validade"
          />
        </div>
        <button>ASSINAR</button>
      </form>
      {openModal ? (
        <Modal
          name={plano.name}
          price={plano.price}
          closeModal={setOpenModal}
          handleSubmit={handleSubmit}
        />
      ) : null}
    </StyledPlano>
  );
}

const StyledPlano = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  & > img {
    width: 164px;
    height: 135px;
    margin-bottom: 25px;
  }

  .beneficio {
    position: relative;

    img {
      position: absolute;
      top: 0;
      left: 0;
    }
    div {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      position: absolute;
      top: 0;
      left: 20px;

      color: #ffffff;
    }

    li {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;

      color: #ffffff;
    }
  }

  .preco {
    position: relative;

    & > div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;

      color: #ffffff;
    }
  }

  h4 {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

    color: #ffffff;
  }

  form {
    height: 220px;
    width: 300px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;

    input {
      height: 52px;
      width: 299px;
      border-radius: 8px;
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      input {
        width: 145px;
        height: 52px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        border-radius: 8px;
      }
    }

    button {
      height: 52px;
      width: 299px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      background-color: #ff4791;
      color: #ffffff;
    }
  }

  input:placeholder {
    padding-left: 7px;
  }
`;
