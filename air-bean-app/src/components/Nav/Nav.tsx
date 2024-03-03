import React from "react";
/* import { NavListType } from '../types'; */
import { navListProps } from "../props";
import "../Nav/nav.scss";
import close from "../../assets/images/close.png";

const Nav: React.FC = () => {
  return (
    <div className="nav-container">
      <img className="nav-container__close-button" src={close} alt="close button" />

      <ul className="nav-container__list">
        {navListProps.map((item, index) => (
          <li key={item.id}>
            <a href={item.url}>{item.title}</a>
            {index !== navListProps.length - 1 && <hr className="hr" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
