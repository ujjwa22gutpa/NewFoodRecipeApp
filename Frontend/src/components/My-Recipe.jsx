
import RecipeItems from "./recipesItems";



export default function MyRecipe(){
    return(
        <>
            <RecipeItems />
            <h2>Made by {localStorage.getItem("name")}</h2>
        </>
    )
}