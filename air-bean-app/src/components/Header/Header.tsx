import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import top from "../../assets/images/top.png";
import navicon from "../../assets/images/navicon.svg";
import carticon from "../../assets/images/carticon.png";
import close from "../../assets/images/close.png";
import "../Header/header.scss";
import Nav from '../Nav/Nav';

const Header = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);
  };

  return (
    <>
      <img src={top} alt="top" />

      <div className="headerIcons">
        {isMenuOpen ? (
          <img src={close} alt="headerIcons__closeicon" onClick={handleMenuToggle} />
        ) : (
          <img src={navicon} alt="headerIcons__navicon" onClick={handleMenuToggle} />
        )}
        {!isAboutPage && (
          <div className="cart-icons-wrapper">
            <img src={carticon} alt="headerIcons__carticon" />
            <p className="headerIcons__cart-counter">0</p>
          </div>
        )}
      </div>

      {isMenuOpen && <Nav handleMenuToggle={handleMenuToggle} />}

      {isMenuOpen && (
        <div className="blur-overlay"></div>
      )}
    </>
  );
};

export default Header;
