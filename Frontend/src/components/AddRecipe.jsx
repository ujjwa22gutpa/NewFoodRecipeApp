import { useState } from "react";
import { handleError, handleSuccess } from "../util/util";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddRecipe(event) {
 const navigate = useNavigate();
  const [item, setItem] = useState({
    tittle: "",
    ingrediants: "",
    instructions: "",
    time: "",
    image: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  }


 async function handleSubmit(event) {
    event.preventDefault();
    const { tittle, ingrediants, instructions, time, image } = item;
    if (!tittle || !ingrediants || !instructions || !time) {
      return handleError("Please fill the all the details");
    }
    try {
      const res = await fetch("http://localhost:8000/addRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tittle: tittle.trim(),
          ingrediants: ingrediants.trim(),
          instructions: instructions.trim(),
          time: time.trim(),
          image: image.trim(),
        }),
      });
      if(res.ok){
        handleSuccess("Recipe Added Successfully");
      }
      const recipe = await res.json();
       navigate('/')
        console.log(recipe);
    } catch (error) {
        handleError("Error",error)
    }
   
  }
  return (
    <>
      <div className="container">
        <div className="container2">
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="tittle">
              Tittle:
              <input
                type="text"
                placeholder="please share the tittle"
                required
                name="tittle"
                value={item.tittle}
                onChange={handleChange}
                autoFocus
              />
            </label>
            <label htmlFor="ingrediants">
              Add Ingrediants:
              <input
                type="text"
                placeholder="Share the Ingrediants"
                required
                name="ingrediants"
                value={item.ingrediants}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="instructions">
              Add instructions:
              <input
                type="text"
                placeholder="Share the instructions"
                required
                name="instructions"
                value={item.instructions}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="time">
              Time:
              <input
                type="text"
                placeholder="Share the time"
                required
                name="time"
                value={item.time}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="image">
              image:
              <input
                type="file"
                placeholder="Share the image"
                name="image"
                value={item.image}
                onChange={handleChange}
              />
            </label>
            <button onClick={handleSubmit}>Add Recipe</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
