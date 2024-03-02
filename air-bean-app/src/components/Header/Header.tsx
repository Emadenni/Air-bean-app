import top from "../../assets/images/top.png";
import "../Header/header.scss";
import navicon from "../../assets/images/navicon.svg";
import carticon from "../../assets/images/carticon.png";

const Header = () => {
  return (
    <>
      <img src={top} alt="top" />

      <div className="headerIcons">
        <img src={navicon} alt="headerIcons__navicon" />

        <div className="cart-icons-wrapper">
          <img src={carticon} alt="headerIcons__carticon" />
          <p className="headerIcons__cart-counter">0</p>
        </div>
      </div>
    </>
  );
};

export default Header;
