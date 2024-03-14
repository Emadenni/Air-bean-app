import "../Login/login.scss";
import logoSmall from "../../assets/images/logoSmall.svg";
import { useNavigate } from "react-router-dom";
import Signup from "../Signup/Signup";
import { useState, useEffect } from "react";
import { useCartStore } from "../../store/cartStore";
import useLoggedStore from "../../store/isLoggedStore";

interface LoginData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const isLoggedIn = useLoggedStore((state) => state.isLoggedIn);
  const checkLoginStatus = useLoggedStore((state) => state.checkLoginStatus);
  const [successMessage, setSuccessMessage] = useState("");
  const [failedMessage, setFailedMessage] = useState("");
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  useEffect(() => {
    checkLoginStatus();
  }, []);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Partial<LoginData> = {};

    if (loginData.username.trim() === "") {
      newErrors.username = "Username krävs";
    }
    if (loginData.password.trim() === "") {
      newErrors.password = "Password krävs";
    }
    e;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      fetchLogin();
    }
  };

  const fetchLogin = async () => {
    try {
      const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/user/login", {
        method: "POST",
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok && cart.length > 0) {
        const data = await response.json();
        console.log("login data", data);
        sessionStorage.setItem("token", data.token.toString());
        sessionStorage.setItem("username", loginData.username.toString());
        navigate("/menu");
        window.alert("Login successful! Du kan nu bekräfta dina köp från varukorgen");
        navigate("/menu");
      } else if (response.ok && cart.length == 0) {
        const data = await response.json();
        console.log("login data", data);
        sessionStorage.setItem("token", data.token.toString());
        sessionStorage.setItem("username", loginData.username.toString());
        window.alert("Login successful! Du kan nu välja produkter från menu");
        navigate("/menu");
      } else {
        window.alert("fel inloggningsuppgifter");

        console.error("Error in POST request");
      }
    } catch (error) {
      setFailedMessage("Fel inloggningsuppgifter");
      console.error("An error occurred during the POST request:", error);
    }
  };
  if (isLoggedIn === false) {
    sessionStorage.removeItem("username");
  }
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
            {successMessage && <span className="success">{successMessage}</span>}
            {failedMessage && <span className="failed">{failedMessage}</span>}
          </form>

          <div className="alternatives-link">
            <p>
              Icke registrerad ännu? <br /> Skapa ett konto{" "}
              <a className="green" onClick={handleSignUpToggle}>
                här!
              </a>
            </p>
          </div>
        </section>
      </article>
      {showSignUp && <Signup />}
    </>
  );
};

export default Login;
