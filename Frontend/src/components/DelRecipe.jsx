import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../util/util";
import { useNavigate } from "react-router-dom";




export default function DelRecipe() {
const navigate = useNavigate();
const {id} = useParams()
useEffect(()=>{
    const delRecipe = async ()=>{
        try {
            const res = await fetch(`http://localhost:8000/recipe/${id}`, {
                method: 'DELETE'
            })
            const data = await res.json();
            if(res.ok) {
                handleSuccess("Recipe Deleted Successfully")
                navigate('/')
            } else {
                handleError(data.message || "Error deleting recipe")
            }
        } catch (error) {
            handleError("Error Occurred");
            console.log(error);
        }
    }
    delRecipe()
},[id])
 
 return (
    <ToastContainer />
 )
}