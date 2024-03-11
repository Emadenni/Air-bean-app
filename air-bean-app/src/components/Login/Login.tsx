import "../Login/login.scss";
import logoSmall from "../../assets/images/logoSmall.svg";
import { useNavigate } from "react-router-dom";
import Signup from "../Signup/Signup";
import { useState } from "react";

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

  const handleClickGuest = () => {
    window.confirm("Vill du bekräfta beställningen i din varukorg?");
    navigate("/status");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   
    const newErrors: Partial<LoginData> = {};

    if (loginData.username.trim() === "") {
      newErrors.username = "Username krävs";
    } else if (loginData.username !== 'api-answser') {
      newErrors.username ="användarnamn passar inte";
    } 
    if (loginData.password.trim() === "") {
      newErrors.password = "Password krävs";
    } else if (loginData.password !== 'api-amswer') {
      newErrors.password = "lösenord passar inte";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Invio dei dati del form (loginData)
      console.log("Form submitted:", loginData);
    }
  };

  return (
    <>
      <article className="login-container">
        <section className="login-container__wrapper">
          <img src={logoSmall} alt="logoSmall" />
          <h1>Du är inte inloggad</h1>
          <h2>Du kan logga in genom att fylla i fälten nedan.</h2>
          <form className="form"  onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input type="text" id="username" name="username" value={loginData.username} onChange= {handleChange} className="form-input" required />
              {errors.username && <span className="error">{errors.username}</span>}
            </div>
            <div className="form__group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input type="password" id="password" name="password"  value={loginData.password} onChange= {handleChange} className="form-input" required />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="form__radio">
              <input className="radioInput" type="radio" name="gender" value="male" />
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
