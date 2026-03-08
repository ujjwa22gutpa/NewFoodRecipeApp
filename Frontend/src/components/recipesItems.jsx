
import { useLoaderData } from "react-router-dom"
import { LuTimer } from "react-icons/lu";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {Link} from "react-router-dom";


export default function RecipeItems() {
    const allRecipes = useLoaderData(); // using useLoaderData hook to access the data loaded by the loader function defined in the router configuration, in this case, it will fetch all recipes data from the backend API and make it available to this component for rendering
    const path = window.location.pathname === '/my-recipes' ? true:false
    return(
        <>
         <div className="card-container">
              {
                  allRecipes?.map((item,index) =>{
                      return (
                          <div key={index} className="card">
                            <img src={`http://localhost:8000/images/${item.image}`} alt={item.tittle} width="120px" height="100px"/>
                             <div className="card-body">
                                <div className="title">{item.tittle}</div>
                                <div className="icons">
                                     <div className="timer"><LuTimer />{item.time} </div>
                                  {  (!path)?  <FaHeart />
                                      :
                                        <div className="action">
                                          <Link to={`/edit-favourites/${item._id}`}> <FaEdit /> </Link>
                                            <MdDelete className="deleteIcon" />
                                        </div>
                                  }       
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