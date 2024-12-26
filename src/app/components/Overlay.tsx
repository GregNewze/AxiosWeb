import React from "react";

interface OverlayProps {
  togglePanel: () => void;
}
//Overlay diabolica
const Overlay: React.FC<OverlayProps> = ({ togglePanel }) => {
  return (
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1 className="title">Faça seu cadastro para<br /> acessar o Axios.</h1>
          <p>Você possui uma conta? Faça Login clicando abaixo!</p>
          <button className="ghost" onClick={togglePanel}>
            Login
            <i className="lni lni-arrow-left login"></i>
          </button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1 className="title">Bem-vindo<br /> ao Axios!</h1>
          <p>Se você ainda não possui uma conta, crie sua conta e comece a gerenciar seu estoque conosco!</p>
          <button className="ghost" onClick={togglePanel}>
            Criar conta
       <i className="lni lni-arrow-right register"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
