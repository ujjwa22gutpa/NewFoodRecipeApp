import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import MainNavigation from "./components/MainNavigation";
import axios  from "axios"




const getAllRecipes = async () =>{
  try {
      const allRecipes = await axios.get("http://localhost:8000/recipe");
      return allRecipes.data;

  } catch (error) {
      console.log("Error Occured",error);
      return [];
  }
  
}

const router = createBrowserRouter([
  {path:'/', element:<MainNavigation />, children:[
     {index:true,element:<Home />,loader:getAllRecipes}
  ]}
])


export default function App() {
  return (
    <>
  <RouterProvider  router={router}></RouterProvider>
    </>
  );
} 
