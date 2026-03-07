import { useState, useEffect } from "react";
import { handleError, handleSuccess } from "../util/util";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import './login.css'; 

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((preUser) => ({
      ...preUser,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = user;
    if (!email || !password) {
      handleError("Both Fields are required");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email.trim(),
          password: user.password.trim(),
        }),
      });
      const data = await response.json();
      console.log(data);
      const { message, success } = data;
      if (success) {
        localStorage.setItem("jwtToken", data.jwtToken);
        localStorage.setItem("email", data.email);
        localStorage.setItem("name", data.name);
        // Dispatch custom event to notify Navbar of login
        window.dispatchEvent(new Event("userLoggedIn"));
        handleSuccess(message, "Login SuccessFully");
        setUser({
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/");
        }, );
      } else if (!success) {
        handleError(message, "Email or password is not valid");
      }
    } catch (error) {
      console.log("Error Occured", error);
      handleError("An error occurred during login", error);
    }
  }
  return (
    <>
      <div className="parent">
        <h2>Login Form</h2>
        <div className="child">
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="email">
              Enter Email:
              <input
                type="email"
                placeholder="Enter the Email"
                required
                onChange={handleChange}
                name="email"
                value={user.email}
                autoFocus
              />
            </label>
            <label htmlFor="password">
              Enter the password:
              <input
                type="password"
                placeholder="Enter the password"
                required
                onChange={handleChange}
                name="password"
                value={user.password}
              />
            </label>
            <button type="submit">Login</button>
          </form>
          <span>
            Don't have an account ?<Link to="/signup">Sign Up</Link>
          </span>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
