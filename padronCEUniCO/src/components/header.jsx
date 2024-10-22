import React from 'react';

const Header = () => {
  return (
    <nav className="navbar w-100 p-2 border-bottom">
      <div className="container-fluid">
        <div className="row w-100">
          <div className="col-auto ">
            <a className="navbar-brand" href="https://www.uaco.unpa.edu.ar">
              <img src="/logo.png" height="60" className="d-inline-block align-top my-2" alt="" />
            </a>
          </div>
          <div className="col text-start d-flex align-items-center">
            <p className="mb-0 fs-5 header-title">
              Consulta de Padrón - Elecciones CEUniCO 2024
            </p>
          </div>
        </div>
      </div>
    </nav>

  );
};

export default Header;