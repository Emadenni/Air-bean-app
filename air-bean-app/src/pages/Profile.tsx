import Header from "../components/Header/Header";
import "../pages/profile.scss";



const Profile = () => {
  return (
  <section className="profile-wrapper">
    <div className="inProfile">
        <Header />
      </div>
    <article className="profile-container" ></article>
  </section>
  )
};

export default Profile;
