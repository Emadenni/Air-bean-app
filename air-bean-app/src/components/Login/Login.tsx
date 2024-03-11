import "../Login/login.scss";
import logoSmall from "../../assets/images/logoSmall.svg";
import { useNavigate } from "react-router-dom";
import Signup from "../Signup/Signup";
import { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import placeOrder from "../OrderButton/OrderButton";

interface LoginData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUpToggle = () => {
    setShowSignUp(!showSignUp);
  };

  
const { cart } = useCartStore();

const placeOrderByGuest = async () => {
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
    } else {
      console.error("Error in POST request to place the order");
    }
  } catch (error) {
    console.error("An error occurred during the POST request:", error);
  }
};


  const { emptyCart } = useCartStore();
  const handleClickGuest = () => {
    const confirm = window.confirm("Vill du bekräfta beställningen i din varukorg?");

    if (confirm) {
      placeOrderByGuest();
      emptyCart();
      navigate("/status");
    } else {
      navigate("/menu");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Partial<LoginData> = {};

    if (loginData.username.trim() === "") {
      newErrors.username = "Username krävs";
    } /* else if (loginData.username !== "api-answser") {
      newErrors.username = "användarnamn passar inte";
    } */
    if (loginData.password.trim() === "") {
      newErrors.password = "Password krävs";
    } e/* lse if (loginData.password !== "api-amswer") {
      newErrors.password = "lösenord passar inte";
    } */

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      fetchLogin();
     console.log(fetchLogin);
     
    }
  };

  const fetchLogin = async () => {
    try {
      const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/user/login", {
        method: "POST",
        body: JSON.stringify({
          "username": loginData.username,
          "password": loginData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("login data", data);
        sessionStorage.setItem("token", data.token.toString());
        
      } else {
        console.error("Error in POST request");
      }
    } catch (error) {
      console.error("An error occurred during the POST request:", error);
    }
  };

 
  return (
    <>
      <article className="login-container">
        <section className="login-container__wrapper">
          <img src={logoSmall} alt="logoSmall" />
          <h1>Du är inte inloggad</h1>
          <h2>Du kan logga in genom att fylla i fälten nedan.</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={loginData.username}
                onChange={handleChange}
                className="form-input"
                required
              />
              {errors.username && <span className="error">{errors.username}</span>}
            </div>
            <div className="form__group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="form-input"
                required
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="form__radio">
              <input className="radioInput" type="radio" name="gender" value="male" required />
              <label htmlFor="radio">GDPR Ok!</label>
            </div>
            <button type="submit" className="form__button">
              Logga in
            </button>
          </form>

          <div className="alternatives-links">
            <p>
              Icke registrerad ännu? <br /> Skapa ett konto{" "}
              <a className="green" onClick={handleSignUpToggle}>
                här!
              </a>
            </p>
            <p>eller</p>
            <a className="green" onClick={handleClickGuest}>
              Fortsätt som gäst.
            </a>
          </div>
        </section>
      </article>
      {showSignUp && <Signup />}
    </>
  );
};

export default Login;
