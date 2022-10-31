import React from "react";
import styled from "styled-components";

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

export default Modal;

const StyledModal = styled.div`
  width: 248px;
  height: 210px;
  background: #ffffff;
  border-radius: 12px;
`;
