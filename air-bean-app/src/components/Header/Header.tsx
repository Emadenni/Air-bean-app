import React, { useState } from 'react';
import top from "../../assets/images/top.png";
import navicon from "../../assets/images/navicon.svg";
import carticon from "../../assets/images/carticon.png";
import "../Header/header.scss";
import Nav from '../Nav/Nav';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  return (
    <>
    <img src={top} alt="top" />

    <div className="headerIcons">
      <img src={navicon} alt="headerIcons__navicon" onClick={handleMenuToggle} />

      <div className="cart-icons-wrapper">
        <img src={carticon} alt="headerIcons__carticon" />
        <p className="headerIcons__cart-counter">0</p>
      </div>
    </div>

    {isMenuOpen && <Nav />}
    </>
  );
};

export default Header;
