// Nav.tsx
import React from 'react';
/* import { NavListType } from '../types'; */
import { navListProps } from '../props';

const Nav: React.FC = () => {
  return (
    <div>
      <ul>
        {navListProps.map((item) => (
          <li key={item.id}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
