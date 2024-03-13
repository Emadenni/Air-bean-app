import React from "react";
import "../pages/history.scss";
import Header from "../components/Header/Header";
import profileImg from "../assets/images/profileImg.svg";
import { useEffect } from "react";
import useLoggedStore from "../store/isLoggedStore";

const History = () => {
  const isLoggedIn = useLoggedStore((state) => state.isLoggedIn);
  const checkLoginStatus = useLoggedStore((state) => state.checkLoginStatus);

 
    checkLoginStatus();
    if (isLoggedIn == true) {
      const fetchOrderHistory = async () => {
        try {
          const token = sessionStorage.getItem("token");
          const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/user/history", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log("historik", data);
            console.log("historik", data);
          }

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error fetching order history:", error);
        }
      };

      fetchOrderHistory();
    }
 

  return (
    <section className="profile-wrapper">
      <div className="inHistory">
        <Header />
      </div>
      <div className="history-container">
        <img src={profileImg} alt="profile-img" className="history-container__img" />
      </div>
    </section>
  );
};

export default History;
