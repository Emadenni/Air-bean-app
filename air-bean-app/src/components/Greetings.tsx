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
    <div>
      <p className="greetings-text">
        Hej,{" "}
        {isLoggedIn === true ? (
          <>
            {username}

            <Link to="/profile/history">
              <img className="smallProfileImg" src={profileImg} alt="profile" />
            </Link>
          </>
        ) : (
       <span className="guest">
        Gäst <img className="smallProfileImg" src={guestImg} alt="guest" />
        </span>
        )}
      </p>
    </div>
  );
};
<p>Kolla dina order</p>;
export default Greetings;
<div></div>;
