import { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { useEffect } from "react";
import "../EmptyCartOverlay/emptyCartOverlay.scss"

const CartOverlay = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const { cart } = useCartStore();

 
  useEffect(() => {
    setIsCartEmpty(cart.length === 0);
  }, [cart]);

  return (
    <div className={`cart-overlay ${isCartEmpty ? 'active' : ''}`}>
      {isCartEmpty && <div> <h2>Varukorgen är tom</h2> <p>Välj en produkt</p> </div>}
    </div>
  );
};

export default CartOverlay;
