import { useState } from "react";
import Model from "./Model";
import Login from "../Pages/Login";
import SignUp from "../Pages/signUp";
export default function Navbar() {

  const [isOpen, setIsOpen] = useState({
    Login:false,
    SignUp:false
  });
  function handleLogin() {
    setIsOpen({ ...isOpen, Login: true });
  }
  function handleSignUp() {
    setIsOpen({ ...isOpen, SignUp: true });
  }
  return (
    <>
      <header>
        <h2>Food Blog</h2>
        <ul>
          <li>Home</li>
          <li>My Recipe</li>
          <li>Favourites</li>
          <li onClick={handleLogin}>Login</li>
           <li onClick={handleSignUp}>SignUp</li>
        </ul>
      </header>
      {isOpen.Login && <Model onClose = {()=> setIsOpen({ ...isOpen, Login: false })}> <Login /> </Model>}
      {isOpen.SignUp && <Model onClose = {()=> setIsOpen({ ...isOpen, SignUp: false })}> <SignUp /> </Model>}
    </>
  );
}
