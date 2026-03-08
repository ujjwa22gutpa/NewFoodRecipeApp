import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../util/util";
import { ToastContainer } from "react-toastify";
import axios from "axios";

export default function EditFav(event) {
  const navigate = useNavigate();
  const {id} = useParams();
  const [item, setItem] = useState({
    tittle: "",
    ingrediants: "",
    instructions: "",
    time: "",
    image: "",
    user_id: localStorage.getItem("user_id")
  });
  useEffect(() => {
    const getRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/recipe/${id}`);
        const recipe = res.data.recipe;
        console.log(recipe);
        setItem({
          tittle: recipe.tittle,
          ingrediants: recipe.ingrediants,
          instructions: recipe.instructions,
          time: recipe.time,
          image: recipe.image,
          user_id: recipe.user_id
        })
      } catch (error) {
        handleError("Error fetching recipe");
        console.log("API didn't work", error);
      }
    };
    getRecipe();
  }, [id]);


  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "image") {
      setItem((prevItem) => ({ ...prevItem, [name]: event.target.files[0] }));
    } else {
      setItem((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { tittle, ingrediants, instructions, time} = item;
    if (!tittle || !ingrediants || !instructions || !time) {
      return handleError("Please fill all the details");
    }

    const formData = new FormData(); // creating a new FormData object to hold the form data, including the image file, which allows us to send multipart/form-data requests to the backend API for adding a new recipe with an image
    formData.append("tittle", tittle.trim());
    formData.append("ingrediants", ingrediants.trim());
    formData.append("instructions", instructions.trim());
    formData.append("time", time.trim());
    formData.append("image", item.image);
    formData.append("user_id", item.user_id);
    try {
      const res = await fetch(`http://localhost:8000/recipe/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        handleSuccess("Recipe Updated Successfully");
      }
      const recipe = await res.json();
      navigate("/");
      console.log(recipe);
    } catch (error) {
      handleError("Error", error);
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
                onChange={handleChange}
              />
            </label>
            <button type="submit">Edit Recipe</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
