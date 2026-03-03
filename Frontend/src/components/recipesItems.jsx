
import { useLoaderData } from "react-router-dom"
import image from "../assets/image.JPG";
import { LuTimer } from "react-icons/lu";
import { FaHeart } from "react-icons/fa6";


export default function RecipeItems() {
    const allRecipes = useLoaderData();
    console.log(allRecipes)
    return(
        <>
         <div className="card-container">
              {
                  allRecipes?.recipes?.map((item,index) =>{
                      return (
                          <div key={index} className="card">
                            <img src={image} alt={item.name} width="120px" height="100px"/>
                             <div className="card-body">
                                <div className="title">{item.tittle}</div>
                                <div className="icons">
                                     <div className="timer"><LuTimer />{item.time} </div>
                                            <FaHeart />
                                </div>
                             </div>
                          </div>
                      )
                  }

                  )
              }
         </div>
        
        </>
    )
}