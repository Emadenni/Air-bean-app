import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLoggedStore from "../store/isLoggedStore";
import "../pages/Menu";
import profileImg from "../assets/images/profileImg.svg";
import guestImg from "../assets/images/guestImg.jpg";
const Greetings: React.FC = () => {
  const isLoggedIn = useLoggedStore((state) => state.isLoggedIn);
  const checkLoginStatus = useLoggedStore((state) => state.checkLoginStatus);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    checkLoginStatus();
    const storedUsername = sessionStorage.getItem("username");
    setUsername(storedUsername);
    console.log(storedUsername);
  });

  return (
    <div className="greetings-container" style={{ backgroundColor: isLoggedIn ? "rgb(100, 134, 88, 0.3)" : "rgb(240, 164, 123,0.5)" }}>
      <p className="greetings-box">
        
        {isLoggedIn === true ? (
          <>
           Hej,{" "} {username} {<span className="logged">•</span>}

            <Link to="/profile/history">
              <img className="smallProfileImg" src={profileImg} alt="profile" />
            </Link>
          </>
        ) : (
       <span className="guest">
        Hej,{" "}Gäst {<span className="unlogged">  •</span>} 
        <Link to="/profile">
        <img className="smallProfileImg" src={guestImg} alt="guest" />
        </Link>
        </span>
        )}
      </p>
    </div>
  );
};
<p>Kolla dina order</p>;
export default Greetings;
<div></div>;
