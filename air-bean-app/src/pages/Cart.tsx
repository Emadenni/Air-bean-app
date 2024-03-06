import { useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import { useCountStore, useUpdateCount } from "../store/cartStore";
import "../pages/cart.scss";
import arrowUp from "../assets/images/arrow-up.svg";
import vectorUp from "../assets/images/vector-up.svg";
import vectorDown from "../assets/images/vector-down.svg";
import remove from "../assets/images/remove.jpg";
import { CartProps, cartProduct } from "../components/types";
import close from "../assets/images/close.png";
import CartOverlay from "../components/EmptyCartOverlay/EmptyCartOverlay";

const Cart: React.FC<CartProps> = ({ handleToggleCart }: CartProps) => {
  const { cart, removeProduct, total, updateQuantity, emptyCart } = useCartStore();
  const { increment, decrement, resetCounts } = useCountStore();
  

  const handleDecrement = (productId: string) => {
    const product = cart.find((item) => item.id === productId);
    if (product && product.quantity > 0) {
      decrement();
      updateQuantity(productId, -1);
    }
  };

  const handleIncrement = (productId: string) => {
    increment();
    updateQuantity(productId, 1);
  };

  useEffect(() => {}, [cart]);
  

  return (
    <div className="cart-container">
      <img src={arrowUp} alt="arrow up" className="arrow-up" />
      <CartOverlay />
      <div className="cart-container__list">
        <h1>Din beställning</h1>
        <ul>
          {cart.map((product: cartProduct) => (
            <li key={product.id} className="cart-container__item">
              <p className="cart-container__item-p">
                {product.title}
                <span>{product.price} kr</span>
              </p>
              <p className="cart-container__item-dots">....................................................</p>

              <div className="cart-container__quantityDiv">
                <img className="vector" src={vectorUp} alt="vector" onClick={() => handleIncrement(product.id)} />
                <p>{product.quantity}</p>
                <img className="vector"  src={vectorDown} alt="vector" onClick={() => handleDecrement(product.id)} />
              </div>
              {<img src={remove} alt="remove" className="remove-icon" onClick={() => removeProduct(product.id)} />}
            </li>
          ))}
        </ul>

        <div className="cart-container-total">
          <p className="cart-container-total__text">
            Total
            <span>inkl moms + drönarleverans</span>
          </p>
          <p className="cart-container-total__dots">...............................</p>{" "}
          <p className="cart-container-total__price">{total} kr</p>
        </div>
        <button
          className="clearCartButton"
          onClick={() => {
            emptyCart();
            resetCounts();
          }}
        >
          Remove all products
        </button>
        <button className="toCashButton">Take my money!</button>
      </div>
      <img className="cart-container__close-button" src={close} alt="close button" onClick={handleToggleCart} />
    </div>
  );
};

export default Cart;
