import { useState, useEffect } from "react";
import { handleError, handleSuccess } from "../util/util";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "./signUp.css";
export default function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
    name:''
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
    const { email, password, name } = user;
    if (!email || !password || !name) {
      handleError("All Fields are required");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email.trim(),
          password: user.password.trim(),
          name: user.name.trim()
        }),
      });
      const data = await response.json();
      console.log(data);
      const { message, success } = data;
      if (success) {
        handleSuccess(message, "Sign Up SuccessFully");
        setUser({
          email: '',
          password: '',
          name:''
        });
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (!success) {
        handleError(message ||  "Sign Up Failed");
      }
    } catch (error) {
      console.log("Error Occured", error);
      handleError("An error occurred during sign up", error.message);
    }
  }
  return (
    <>
      <div className="container1">
        <h2>Sign Up Form</h2>
        <div className="container2">
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="name">
              Enter the name:
              <input
                type="text"
                placeholder="Enter the name"
                required
                name="name"
                value={user.name}
                autoFocus
                onChange={handleChange}
              />
            </label>
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
            <button type="submit">Sign Up</button>
               <span>
           
            Already have an account ?<Link to="/login">Login</Link>
          </span>
          </form>
        
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
