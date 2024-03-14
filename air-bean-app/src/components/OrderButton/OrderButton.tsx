import React, { useState, useEffect } from "react";
import { useCartStore } from "../../store/cartStore";
import useLoggedStore from "../../store/isLoggedStore";
import { useNavigate } from "react-router-dom";

interface OrderButtonProps {
  emptyCart: () => void;
  resetCounts: () => void;

}

const OrderButton: React.FC<OrderButtonProps> = ({ emptyCart }: OrderButtonProps) => {
  const navigate=useNavigate();
  const { cart } = useCartStore();
  const isLoggedIn = useLoggedStore(state => state.isLoggedIn);
  const checkLoginStatus = useLoggedStore(state => state.checkLoginStatus);

  useEffect(() => {
    checkLoginStatus(); 
  }, []); 

  const handleOrderClick = async () => {
    if (isLoggedIn) {
      await placeOrder();
    } else { 
      const confirm = window.confirm("Du är inte inloggad: Vill du försätta som gäst?")

      if(confirm && cart.length>0) {
      const confirm = window.confirm("Vill du bekräfta beställningen i din varukorg?");
      
      if (confirm && isLoggedIn === false) {
        placeOrderAsGuest();
       } else {
        navigate("/menu");
      }
    }
    else {
      navigate("/menu")
    }
  }
  };



  const placeOrder = async () => {
    try {
      const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order", {
        method: "POST",
        body: JSON.stringify({
          details: {
            order: cart.map((product) => ({
              name: product.title,
              price: product.price,
            })),
          },
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const { eta, orderNr } = data;
        console.log("ETA:", eta);
        console.log("Order Number:", orderNr);
        localStorage.setItem("orderNr", orderNr.toString());
        sessionStorage.removeItem("eta");
        sessionStorage.removeItem("orderNr");
        sessionStorage.setItem("eta", eta.toString());
        sessionStorage.setItem("orderNr", orderNr.toString());
        emptyCart();
        redirectToOrderStatusPage();
        
      } else {
        console.error("Error in POST request to place the order");
      }
    } catch (error) {
      console.error("An error occurred during the POST request:", error);
    }
  };
  const placeOrderAsGuest = async () => {
    try {
      const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order", {
        method: "POST",
        body: JSON.stringify({
          details: {
            order: cart.map((product) => ({
              name: product.title,
              price: product.price,
            })),
          },
        }),
        headers: {
          "Content-Type": "application/json",
          },
      });

      if (response.ok) {
        const data = await response.json();
        const { eta, orderNr } = data;
        console.log("ETA:", eta);
        console.log("Order Number:", orderNr);
        localStorage.setItem("orderNr", orderNr.toString());
        sessionStorage.removeItem("eta");
        sessionStorage.removeItem("orderNr");
        sessionStorage.setItem("eta", eta.toString());
        sessionStorage.setItem("orderNr", orderNr.toString());
        emptyCart();
        redirectToOrderStatusPage();
        
      } else {
        console.error("Error in POST request to place the order");
      }
    } catch (error) {
      console.error("An error occurred during the POST request:", error);
    }
  };

  const redirectToOrderStatusPage = () => {
    navigate("/order")
  };

  return (
    <div>
      <button className="toCashButton" onClick={handleOrderClick}>
        Take my money!
      </button>
    </div>
  );
};

export default OrderButton;
