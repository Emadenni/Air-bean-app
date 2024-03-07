// Header.tsx
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import top from "../../assets/images/top.png";
import navicon from "../../assets/images/navicon.svg";
import carticon from "../../assets/images/carticon.png";
import { useCountStore} from "../../store/cartStore"
import "../Header/header.scss";
import Nav from "../Nav/Nav";
import Cart from "../../pages/Cart";





const Header = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";
  const isProfilePage = location.pathname === "/profile";
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { count } = useCountStore();

  const handleToggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  const handleToggleNav = () => {
    setIsNavOpen((prevIsNavOpen) => !prevIsNavOpen);
  };

  return (
    <>
      <img src={top} alt="top" />

      <div className="headerIcons">
        <img src={navicon} alt="navicon" onClick={handleToggleNav} />

        {!isAboutPage && !isProfilePage && (
          <div className="cart-icons-wrapper">
            <img src={carticon} alt="carticon" onClick={handleToggleCart} />

            <p className="headerIcons__cart-counter"   >{count}</p> 
          </div>
        )}
      </div>

      {isNavOpen && <Nav handleMenuToggle={handleToggleNav} />}
      {isCartOpen && <Cart handleToggleCart={handleToggleCart} />}

      {isNavOpen && <div className="blur-overlay"></div>}
      {isCartOpen && <div className="blur-overlay2"></div>}
    </>
  );
};

export default Header;
