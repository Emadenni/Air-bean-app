import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/Signup/signup.scss";
import useUserDataStore from "../../store/useUserDataStore";
import logoSmall from "../../assets/images/logoSmall.svg";


interface FormData {
  name: string;
  email: string;
  username: string;
  password: string;
  gender: string;
}

const Signup: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [failedMessage, setFailedMessage] = useState("");
  const navigate = useNavigate();
  const { addUser, userData } = useUserDataStore();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    username: "",
    password: "",
    gender: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Partial<FormData> = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Name krävs";
    } else if (formData.name.trim().split(" ").length < 2) {
      newErrors.name = "Name måste innehålla minst två ord";
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name får inte innehålla siffror";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email krävs";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Ogiltigt e-postformatt";
    }

    if (formData.username.trim() === "") {
      newErrors.username = "Username krävs";
    } else if (formData.username.trim().split(" ").length > 1) {
      newErrors.username = "Username får bara innehålla en enda ord";
    }
    if (formData.password.trim() === "") {
      newErrors.password = "Password krävs";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Password måste innehålla minst en siffra";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = 'Password måste innehålla ett av [!@#$%^&*(),.?":{}|<>]/';
    }

    if (!formData.gender) {
      newErrors.gender = "Please accept GDPR";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newUser = {
        name: formData.name,
        email: formData.email,
        username: formData.username,
      };
      const existingData = JSON.parse(localStorage.getItem("userData") || "[]");
      const updatedData = [...existingData, newUser];
      localStorage.setItem("userData", JSON.stringify(updatedData));
      const isUsernameTaken = userData.some((user) => user.username === newUser.username);
      if (!isUsernameTaken) {
        addUser(newUser);

        
      }

      console.log("users", userData);
      console.log("Form submitted:", formData);
      signupFetch();
    }
  };

  const signupFetch = async () => {
    try {
      const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/user/signup", {
        method: "POST",
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const kontoData = await response.json();
        if (kontoData.success === false) {
        setFailedMessage("Användaren är redan registrerad");
        setTimeout(() => {
          setFailedMessage("");
          }, 2000);

        } else {
          setSuccessMessage("Konto skapat. Du kan logga in nu.");
          setTimeout(() => {
            setSuccessMessage("");
            
          }, 1000);
         
        }

        console.log("kontot skapades", kontoData);
      } else {
        console.error("Error in POST request");
      }
    } catch (error) {
      console.error("An error occurred during the POST request:", error);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <article className="signup-container">
      <section className="signup-container__wrapper">
        <img src={logoSmall} alt="logoSmall" />
        <h1>Välkommen till AirBean-familjen!</h1>
        <h2>Genom att skapa ett konto nedan kan du spara och se din orderhistorik.</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="name" className="form-label">
              Namn
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={22}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form__group">
            <label htmlFor="email" className="form-label">
              Epost
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form__group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              value={formData.username}
              onChange={handleChange}
              required
              maxLength={22}
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
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form__radio">
            <input className="radioInput" type="radio" name="gender" value="male" onChange={handleChange} />
            <label htmlFor="radio">GDPR Ok!</label>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>

          <button type="submit" className="form__button">
            Skapa konto
          </button>
          {failedMessage && <span className="failed">{failedMessage}</span>}
          {successMessage && <span className="success">{successMessage}</span>}
        </form>
      </section>
    </article>
  );
};

export default Signup;