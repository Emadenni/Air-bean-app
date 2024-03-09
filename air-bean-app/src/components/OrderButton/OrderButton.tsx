import React, { useState } from "react";
import { useCartStore, useCountStore } from "../../store/cartStore";

interface OrderButtonProps {
  emptyCart: () => void;
  resetCounts: () => void;
}

const OrderButton: React.FC<OrderButtonProps> = ({ emptyCart }: OrderButtonProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cart } = useCartStore();

  const handleOrderClick = async () => {
    console.log("CLICKED SUCCESSFULLY");

    if (isLoggedIn) {
      await placeOrder();
      emptyCart();
    } else {
      window.alert("You are not logged in");
      emptyCart();
      redirectToProfilePage();
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

        redirectToOrderStatusPage();
      } else {
        console.error("Error in POST request to place the order");
      }
    } catch (error) {
      console.error("An error occurred during the POST request:", error);
    }
  };

  const redirectToProfilePage = () => {
    window.location.href = "/profile";
  };

  const redirectToOrderStatusPage = () => {
    window.location.href = "/status";
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
