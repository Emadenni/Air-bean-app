import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import droneImg from "../assets/images/droneImg.svg";
import "../pages/status.scss";
import useLoggedStore from "../store/isLoggedStore";

const Status = () => {
  const isLoggedIn = useLoggedStore((state) => state.isLoggedIn);
  const orderNr = sessionStorage.getItem("orderNr");
  const [currentEta, setCurrentEta] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const fetchCurrentEta = async () => {
      try {
        const orderNr = sessionStorage.getItem("orderNr");
        const response = await fetch(`https://airbean-9pcyw.ondigitalocean.app/api/beans/order/status/${orderNr}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCurrentEta(data.eta);
        } else {
          console.error("Error fetching eta:");
        }
      } catch (error) {
        console.error("Error fetching eta:", error);
      }
    };

    fetchCurrentEta();
  }, []);

  useEffect(() => {
    if (currentEta === 0 || currentEta === undefined || currentEta === null) {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  }, [currentEta]);
  return (
    <div className="status-container">
      <h1>Current Order</h1>
      <p className="status-container__orderNr">
        Ordernummer <span>#{orderNr}</span>{" "}
      </p>
      <img src={droneImg} alt="drone" />
      <p className="status-container__text">Din beställning kommer att levereras i:</p>
      <p className="status-container__eta">{currentEta !== null ? `${currentEta} minuter` : "Loading..."}</p>
      <Link to={isLoggedIn ? "/profile/history" : "/menu"}>
        <button className="status-container__button">Ok, cool</button>
      </Link>
      {showOverlay && (
        <div className="status-overlay">
          <div className="status-overlay__content">
            <h2>Alla beställningar har levererats</h2>
            <h3>Tack för att du valde oss</h3>
            <Link to="/menu">
              <button className="status-container__button overlay-button">Till startsidan</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Status;
