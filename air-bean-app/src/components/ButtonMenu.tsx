/* // ParentComponent.tsx
import React, { useState } from 'react';
import Nav from './Nav/Nav';

const ParentComponent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  return (
    <div>
      <button onClick={handleMenuToggle}>Toggle Menu</button>
      {isMenuOpen && <Nav />}
    </div>
  );
};

export default ParentComponent;
 */