import React from "react";
import "../pages/history.scss";
import Header from "../components/Header/Header";
import profileImg from "../assets/images/profileImg.svg";

const History = () => {
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
