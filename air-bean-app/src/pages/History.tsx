import React, { useState, useEffect } from "react";
import "../pages/history.scss";
import Header from "../components/Header/Header";
import profileImg from "../assets/images/profileImg.svg";
import useLoggedStore from "../store/isLoggedStore";
import { Order } from "../components/types";

const History = () => {
  const isLoggedIn = useLoggedStore((state) => state.isLoggedIn);
  const checkLoginStatus = useLoggedStore((state) => state.checkLoginStatus);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  useEffect(() => {
    if (isLoggedIn) {
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
            if (Array.isArray(data.orderHistory)) {
              setOrderHistory(data.orderHistory);
            } else {
              console.error("Data received is not an array");
            }
          } else {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error fetching order history:", error);
        }
      };

      fetchOrderHistory();
    }
  }, [isLoggedIn]);

  const getUserDataByUsername = () => {
    const username = sessionStorage.getItem("username");

    const userDataString = localStorage.getItem("userData");
    const userData = JSON.parse(userDataString || "[]");

    const user = userData.find((user: { username: string | null }) => user.username === username);

    const name = user ? user.name : "";
    const email = user ? user.email : "";

    return { name, email };
  };

  const { name, email } = getUserDataByUsername();
  console.log("Name:", name);
  console.log("Email:", email);

  const calculateTotal = (orderHistory: Order[]) => {
    let total = 0;
    orderHistory.forEach((order) => {
      total += order.total;
    });
    return total;
  };

  const total = calculateTotal(orderHistory);
  console.log("Current total:", total);

  return (
    <section className="history-wrapper">
      <div className="inHistory">
        <Header />
      </div>
      <div className="history-container">
        <div className="history-header">
          <img src={profileImg} alt="profile-img" className="history-container__img" />
          <h1>{name}</h1>
          <h2>{email}</h2>
        </div>

        <div className="history-list-wrapper">
          <h3>Orderhistorik</h3>
          <ul>
            {orderHistory.map((order, index) => (
              <li key={index}>
                <div className="orderNrAndDate">
                  <p>#{order.orderNr}</p>
                  <p>{order.orderDate}</p>
                </div>
                <div className="totalOrderSum">
                  <p>total ordersumma</p>
                  <p>{order.total} kr</p>
                </div>
                {index !== orderHistory.length - 1 && <hr className="hr" />}
              </li>
            ))}
          </ul>
        </div>
        <hr className="bigHr" />
        <div className="totalSum">
          <p>Totalt spenderat </p>
          <p> {calculateTotal(orderHistory)} kr</p>
        </div>
      </div>
    </section>
  );
};

export default History;
