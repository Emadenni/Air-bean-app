import { useEffect } from 'react';




const Menu = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(' https://airbean-api-xjlcn.ondigitalocean.app/api/beans/');
        const jsonData = await response.json();
        /* console.log(JSON.stringify(jsonData, null, 2)); */
        console.log(jsonData);
        
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <div>Menu</div>;
};

export default Menu;
