import "../pages/cart.scss";
import arrowUp from "../assets/images/arrow-up.svg";
import vectorUp from "../assets/images/vector-up.svg";
import vectorDown from "../assets/images/vector-down.svg";
import { CartProps } from "../components/types";
import close from "../assets/images/close.png";

const Cart: React.FC<CartProps> = ({ handleToggleCart }: CartProps) => {
  return (
    <div className="cart-container">
      <img src={arrowUp} alt="arrow up" className="arrow-up" />

      <div className="cart-container__list">
        <h1>Din beställning</h1>
        <ul>
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

          {/* da dinamicizzare */}
        </ul>

        <div className="cart-container-total">
          <p className="cart-container-total__text">
            Total
            <span>inkl moms + drönarleverans</span>
          </p>
          <p className="cart-container-total__dots">...............................</p>{" "}
          <p className="cart-container-total__price">343 kr</p>
        </div>
        <button className="toCashButton">Take my money!</button>
      </div>
      <img className="nav-container__close-button" src={close} alt="close button" onClick={handleToggleCart} />
    </div>
  );
};

export default Cart;
