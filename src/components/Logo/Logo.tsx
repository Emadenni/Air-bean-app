import logoImg from "../../assets/images/logoImg.svg";
import header1 from "../../assets/images/header1.svg";
import header2 from "../../assets/images/header2.svg";

const Logo = () => {
  return (
    <section className="logo-container">
      

      <picture>
        <img className="logo-container__image" src={logoImg} alt="logo image" />
      </picture>

      <article className="logo-container__text">
        <h1>AIR BEAN</h1>
        <h2>DRONEDELIVERED COFFEE</h2>
        <img className="logo-container__frame-left" src={header1} alt="header" />
        <img className="logo-container__frame-right" src={header2} alt="header" />
      </article>

     
    </section>
  );
};

export default Logo;
