import Logo from "../components/Logo/Logo";
import { Link } from "react-router-dom";

import "../pages/home.scss";

const Home: React.FC = () => {
  return (
    <Link to="/menu">
      <div className="home-container">
        <Logo />
      </div>
    </Link>
  );
};

export default Home;
