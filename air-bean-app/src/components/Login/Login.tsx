import "../Login/login.scss";
import logoSmall from "../../assets/images/logoSmall.svg";

const Login = () => {
  return (
    <article className="login-container">
      <section className="login-container__wrapper" >
      <img src={logoSmall} alt="logoSmall" />
      <h1>Du är inte inloggad</h1>
      <h2>Fyll i fälten nedan</h2>
      <form className="form">
        <div className="form__group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input type="text" id="username" name="username" className="form-input" required />
        </div>
        <div className="form__group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" id="password" name="password" className="form-input" required />
        </div>
        <button type="submit">Login</button>
      </form>
      </section>
    </article>
  );
};

export default Login;

