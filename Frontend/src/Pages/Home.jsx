import { useNavigate } from "react-router-dom";
import image from "../assets/image.JPG";
import RecipeItems from "../components/recipesItems";
export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <section className="home">
        <div className="left">
          <h1>Food Recipe</h1>
          <h5>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta,
            quidem consequuntur sapiente deserunt esse ratione. Minus, mollitia
            nulla debitis nemo dignissimos at. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Iure neque itaque ipsum. Modi, eaque.
            Repellat vel aspernatur nemo velit at eveniet laudantium saepe
            necessitatibus corporis, consequatur ex quasi similique! Magnam
            placeat sed itaque ducimus iure facere ad ex repudiandae,
            exercitationem, cupiditate nisi eius odit.
          </h5>
          <button onClick={(e)=>{navigate('/addRecipe')}}>Share your Recipe</button>
        </div>
        <div className="right">
          <img src={image} alt="Just an Image" width="320px" height=" 300px" />
        </div>
      </section>
      <div className="bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#00cba9"
            fillOpacity="1"
            d="M0,192L40,186.7C80,181,160,171,240,186.7C320,203,400,245,480,266.7C560,288,640,288,720,261.3C800,235,880,181,960,133.3C1040,85,1120,43,1200,21.3C1280,0,1360,0,1400,0L1440,0L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="recipe">
           <RecipeItems />
      </div>
    </>
  );
}
