import { useEffect, useState } from "react";
import "../pages/menu.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer.";
import { product } from "../components/types";
import add from "../assets/images/add.png";
import { useCartStore } from "../store/cartStore";
import { useCountStore } from "../store/cartStore";
import { cartProduct } from "../components/types";

const Menu = () => {
  const [products, setProducts] = useState([]);

  const { increment } = useCountStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/beans/");
        const jsonData = await response.json();
        setProducts(jsonData.menu);
        /* console.log("prod", products); */
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  /* console.log("prod in main", products); */

  const { addToCart } = useCartStore();

  const handleAddToCart = (product: product) => {
    addToCart(product as unknown as cartProduct);
    increment();
    console.log("function's working");
  };

  return (
    <div className="menu-container">
      <div className="inMenu">
        <Header />
      </div>

      <main className="menu-list-wrapper">
        <h1>Meny</h1>
        <ul className="menu-list">
          {Array.isArray(products) &&
            products.map((product: product) => (
              <li key={product.id} className="menu-list__item">
                <img
                  src={add}
                  alt="add icon"
                  className="addButton"
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                />
                <div>
                  <h2>{product.title}</h2>
                  <p className="menu-list__item-desc">{product.desc}</p>
                </div>
                <aside>
                  <p className="menu-container__item-dots">...............................</p>
                  <p className="menu-list__item-price">{product.price} kr</p>
                </aside>
              </li>
            ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
};

export default Menu;
