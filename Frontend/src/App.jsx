import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import MainNavigation from "./components/MainNavigation";
import axios from "axios";
import Login from "./Pages/Login";
import SignUp from "./Pages/signUp";
import "react-toastify/dist/ReactToastify.css";
const getAllRecipes = async () => {
  try {
    const allRecipes = await axios.get("http://localhost:8000/recipe"); //axios can automatically parse the response into json data unlike the normal fetch method where we have to call the .json() method to parse the response, here we are making a GET request to the backend API endpoint to fetch all recipes data and storing it in the allRecipes variable
    return allRecipes.data;
  } catch (error) {
    console.log("Error Occured", error);
    return [];
  }
};

const router = createBrowserRouter([
  // creating a router object using createBrowserRouter function from react-router-dom
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { index: true, element: <Home />, loader: getAllRecipes },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> }
     // default route for the home page, it will load the Home component and also call the getAllRecipes function to fetch all recipes data before rendering the component
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider> 
    </>
  );
}

// Ye jo router maine
      // banaya hai, ab isko pura app me activate karo agar ye line na hoti to
      // routing ka system kaam nahi karta, RouterProvider component ko use karke
      // hum apne app me router ko provide karte hai, jisse ki humare defined
      // routes work kar sake

//  RouterProvider = hotel manager 👨‍💼

// createBrowserRouter = hotel ka map 🗺️

// path = room number

// element = room ke andar ka design

// loader = room me pehle se khana rakhna 🍽️

// Outlet = jaha guest baithta hai

// If interviewer asks:

// Difference between fetch and axios?

// You say:

// Fetch is built-in browser API

// Axios is third-party library

// Axios auto parses JSON

// Axios better error handling

// Axios supports interceptors & timeout

// Fetch requires manual configuration
