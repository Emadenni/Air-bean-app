import React from "react";
import { NavProps } from '../types';
import { navList } from "../data";
import "../Nav/nav.scss";
import close from "../../assets/images/close.png";


const Nav: React.FC<NavProps> = ({ handleMenuToggle }: NavProps) => {

  
  return (
   
    <div className="nav-container">
      <img className="nav-container__close-button" src={close} alt="close button" onClick={handleMenuToggle} />

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
