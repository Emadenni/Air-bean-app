import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import droneImg from "../assets/images/droneImg.svg";
import "../pages/order.scss";
import useLoggedStore from "../store/isLoggedStore";

const Order= () => {
  const isLoggedIn = useLoggedStore((state) => state.isLoggedIn);
  const checkLoginStatus = useLoggedStore((state) => state.checkLoginStatus);
  const [eta, setEta] = useState("");
  const [orderNr, setOrderNr] = useState("");

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const storedEta = sessionStorage.getItem("eta");
    const storedOrderNr = sessionStorage.getItem("orderNr");

    if (storedEta && storedOrderNr) {
      setEta(storedEta);
      setOrderNr(storedOrderNr);
    }
    console.log(orderNr);
  }, []);

  

  return (
    <div className="order-container">
      <p className="order-container__orderNr">
        Ordernummer <span>#{orderNr}</span>{" "}
      </p>
      <img src={droneImg} alt="drone" />

      <p className="order-container__text">Din beställning är på väg!</p>
      <p className="order-container__eta">
        {eta} <span>minuter</span>{" "}
      </p>
      <Link to={isLoggedIn ? "/profile/history" : "/menu"}>
        <button className="order-container__button">Ok, cool</button>
      </Link>
    </div>
  );
};

export default Order;