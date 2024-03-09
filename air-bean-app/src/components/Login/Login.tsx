import "../Login/login.scss";
import logoSmall from "../../assets/images/logoSmall.svg";
import { useNavigate } from "react-router-dom";
import Signup from "../Signup/Signup";
import { useState } from "react";


const Login = () => {
  const navigate=useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUpToggle = () => {
    setShowSignUp(!showSignUp);
  }

  const handleClickGuest = () => {
  window.confirm("Vill du bekräfta beställningen i din varukorg?")
   navigate("/status")
  }
  
  
  return (
    <>
    <article className="login-container">
      <section className="login-container__wrapper">
        <img src={logoSmall} alt="logoSmall" />
        <h1>Du är inte inloggad</h1>
        <h2>Du kan logga in genom att fylla i fälten nedan.</h2>
        <form className="form">
          <div className="form__group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input type="text" id="username" name="username" className="form-input" required />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" id="password" name="password" className="form-input" required />
          </div>
          <div className="form__radio">
            <input className="radioInput" type="radio" name="gender" value="male" />
            <label htmlFor="radio">GDPR Ok!</label>
          </div>
          </form>
          <button type="submit" className="form__button">
            Logga in
          </button>
          <div className="alternatives-links">
            <p>Icke registrerad ännu? <br /> Skapa ett konto <a className="green" onClick={handleSignUpToggle}>här!</a></p>
            <p>eller</p>
            <a className="green" onClick={handleClickGuest}>Fortsätt som gäst.</a>
          </div>
       
      </section>
    </article>
    {showSignUp && <Signup />}
    </>
  );
};

export default Login;
