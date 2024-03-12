import Header from "../components/Header/Header";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import React, { useEffect, useState } from "react";

import "../pages/profile.scss";
const Profile = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
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
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <section className="profile-wrapper">
      <div className="inProfile">
        <Header />
      </div>
      <Login />
    </section>
  );
};

export default Profile;
