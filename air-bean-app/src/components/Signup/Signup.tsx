import "../../components/Signup/signup.scss"
import logoSmall from "../../assets/images/logoSmall.svg";

const Signup = () => {
  return (
    <article className="signup-container">
      <section className="signup-container__wrapper">
      <img src={logoSmall} alt="logoSmall" />
      <h1>Välkommen till AirBean-familjen!</h1>
        <h2>Genom att skapa ett konto nedan kan du spara och se din orderhistorik.</h2>
        <form className="form">
          <div className="form__group">
            <label htmlFor="username" className="form-label">
              Namn
            </label>
            <input type="text" id="username" name="username" className="form-input" required />
          </div>
          <div className="form__group">
            <label htmlFor="username" className="form-label">
              Epost
            </label>
            <input type="text" id="username" name="username" className="form-input" required />
          </div>
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
            Skapa konto
          </button>
          </section>
    </article>
    
  );
};

export default Signup;
