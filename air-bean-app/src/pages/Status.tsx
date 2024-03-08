import { useEffect, useState } from "react";
import droneImg from "../assets/images/droneImg.svg"

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
    <div>
       <p>Order Number: {orderNr}</p>
       <img src={droneImg} alt="drone" />
  
      <p>Din beställning är på väg!</p>
      <p>ETA: {eta} <span>minuter</span> </p> 
     <button>Ok, cool</button>
    </div>
  );
};

export default Status;
