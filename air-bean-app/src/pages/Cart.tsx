import "../pages/cart.scss";
import arrowUp from "../assets/images/arrow-up.svg";
import vectorUp from "../assets/images/vector-up.svg";
import vectorDown from "../assets/images/vector-down.svg";

const Cart = () => {
  return (
    <div className=".cart-container">
      <img src={arrowUp} alt="arrow up" className="arrow-up" />

      <ul className="cart-container__list">
        <h1>Din beställning</h1>
        <li className="cart-container__item">
          <p className="cart-container__item-p">
            Bryggkaffe
            <span>98 kr</span>
          </p>
          <p className="cart-container__item-dots">..................................</p>

          <div className="cart-container__quantityDiv">
            <img src={vectorUp} alt="vector" />
            <p>2</p>
            <img src={vectorDown} alt="vector" />
          </div>

        </li>
      </ul>
    </div>
  );
};

export default Cart;
