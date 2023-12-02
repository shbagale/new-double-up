import React from 'react';
import logo from '../Assets/logo.png'; // adjust the path based on your project structure
import './Header.css';


function Header() {
  return (
    <div className="header-container">
    <div className="background-block"></div>
    <img src={logo} alt="Logo" />
    </div>
  );
}

export default Header;
