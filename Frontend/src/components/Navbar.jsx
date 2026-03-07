import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("jwtToken");
    const userName = localStorage.getItem("name");

    if(token){
      setIsLoggedIn(true);
      setName(userName);
    }

  }, [isLoggedIn]);

  function handleLogout() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    setName("");
  }

  return (
    <>
      <header>
        <h2>Food Blog</h2>

        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li ><NavLink to={isLoggedIn?"/my-recipes":'/'}>My Recipe</NavLink></li>
          <li ><NavLink to={isLoggedIn?"/favourites":'/'}>Favourites</NavLink></li>

          {isLoggedIn ? (
            <>
              <li>Welcome : {name}</li>
              <li onClick={handleLogout}>Logout</li>
            </>
          ) : (
            <>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/signup">SignUp</NavLink></li>
            </>
          )}

        </ul>
      </header>
      
    </>
  );
}