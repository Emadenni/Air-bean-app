import { useEffect, useState } from "react";

const Status = () => {
  const [orders, setOrders] = useState([{}]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/user/history");
        const jsonData = await response.json();
        setOrders(jsonData.menu);
        console.log("orders", orders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <div>Status</div>;
};

export default Status;
