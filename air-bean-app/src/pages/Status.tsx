import { useEffect, useState } from "react";
import droneImg from "../assets/images/droneImg.svg"
import "../pages/status.scss"

const Status = () => {
  const [eta, setEta] = useState("");
  const [orderNr, setOrderNr] = useState("");

  useEffect(() => {
 
    const storedEta = sessionStorage.getItem("eta");
    const storedOrderNr = sessionStorage.getItem("orderNr");
    
    if (storedEta && storedOrderNr) {
      setEta(storedEta);
      setOrderNr(storedOrderNr);
    }
    
  }, []);

  
  

  return (
    <div className="status-container">
       <p className="status-container__orderNr">Ordernummer  <span>#{orderNr}</span> </p>
       <img src={droneImg} alt="drone" />
  
      <p className="status-container__text" >Din beställning är på väg!</p>
      <p className="status-container__eta">{eta} <span>minuter</span> </p> 
     <button className="status-container__button">Ok, cool</button>
    </div>
  );
};

export default Status;
