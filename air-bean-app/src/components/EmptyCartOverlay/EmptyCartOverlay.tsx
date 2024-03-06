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
      {isCartEmpty && <div> <h2>The cart is empty</h2> <p>Please, choose a product</p> </div>}
    </div>
  );
};

export default CartOverlay;
