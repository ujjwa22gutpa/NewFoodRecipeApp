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
    const { tittle, ingrediants, instructions, time } = item;
    if (!tittle || !ingrediants || !instructions || !time) {
      return handleError("Please fill all the details");
    }
    if (!item.image) {
      return handleError("Please select an image file");
    }

    const formData = new FormData(); // creating a new FormData object to hold the form data, including the image file, which allows us to send multipart/form-data requests to the backend API for adding a new recipe with an image
    formData.append("tittle", tittle.trim());
    formData.append("ingrediants", ingrediants.trim());
    formData.append("instructions", instructions.trim());
    formData.append("time", time.trim());
    formData.append("image", item.image);
    try {
      const res = await fetch("http://localhost:8000/addRecipe", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        handleSuccess("Recipe Added Successfully");
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
            <button type="submit">Add Recipe</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
