import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Plano() {
  const [plano, setPlano] = useState([]);
  const idPlano = useParams();
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

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



      <form>
        <input type="name" placeholder="Nome impresso no cartão" name="name"/>
        <input placeholder="Digitos do cartão"/>
        <div>
            <input placeholder="Código de segurança"/>
            <input type="date" placeholder="Validade" name="date"/>
        </div>
        <button>ASSINAR</button>
      </form>
    </>
  );
}
