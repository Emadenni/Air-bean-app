import React, { useEffect, useState } from "react";
import useLoggedStore from "../store/isLoggedStore";
import "../pages/Menu"
const Greetings: React.FC = () => {
  const isLoggedIn = useLoggedStore((state) => state.isLoggedIn);
  const checkLoginStatus = useLoggedStore(state => state.checkLoginStatus);
  const [username, setUsername] = useState<string | null>(null);

 

  useEffect(() => {
    checkLoginStatus(); 
    
  
    const storedUsername = sessionStorage.getItem("username");
    setUsername(storedUsername);
    console.log(storedUsername);
  });

  return (
    <div>
      <p className="greetings-text">Hej, {isLoggedIn===true  ? `${username}` : "Gäst"}</p>
    </div>
  );
};

export default Greetings;
