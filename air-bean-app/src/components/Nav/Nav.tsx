import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavProps } from "../types";
import { navList } from "../data";
import "../Nav/nav.scss";
import close from "../../assets/images/close.png";

const Nav: React.FC<NavProps> = ({ handleMenuToggle }: NavProps) => {
  const navigate = useNavigate();
  const [loginToggle, setLoginToggle] = useState("Login");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setLoginToggle("Logout");
    }
  }, []);
  const handleLoginLogout = () => {
    if (loginToggle === "Login") {
      navigate("/profile");
    } else {
      sessionStorage.removeItem("token");

      setLoginToggle("Login");
    }
  };

  return (
    <div className="nav-container">
      <img className="nav-container__close-button" src={close} alt="close button" onClick={handleMenuToggle} />
      <button className="logToggleButton" onClick={handleLoginLogout}>{loginToggle}</button>
      <ul className="nav-container__list">
        {navList.map((item, index) => (
          <li key={item.id}>
            <a href={item.url}>{item.title}</a>
            {index !== navList.length - 1 && <hr className="hr" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
