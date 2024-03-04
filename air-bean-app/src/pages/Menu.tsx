import { useEffect } from "react";
import "../pages/menu.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer.";




const Menu = () => {
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(" https://airbean-api-xjlcn.ondigitalocean.app/api/beans/");
        const jsonData = await response.json();
        /* console.log(JSON.stringify(jsonData, null, 2)); */
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return(
  <div className="menu-container">
    <div className="inMenu">
    <Header />
    </div>
    <Footer />
  </div>
  )
};

export default Menu;
