import Header from "../components/Header/Header";
import Login from "../components/Login/Login";
import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import "../pages/profile.scss"
const Profile = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/user/history");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setOrderHistory(data);
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

{/* {orderNr},
{total} */}
   
  </section>
  )
};

export default Profile;
