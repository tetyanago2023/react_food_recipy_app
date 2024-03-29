import {useParams} from "react-router-dom";
import {GlobalContext} from "../../context";
import {useContext, useEffect} from "react";

const Details = () => {
    const { id } = useParams();
    const {
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorites,
        favoritesList
    } = useContext(GlobalContext);

    console.log(id);

    useEffect(() => {
        const getRecipeDetails = async () => {
            try{
                const res = await fetch(
                    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
                );

                const data = await res.json();
                console.log(data);

                if(data?.data) {
                    setRecipeDetailsData(data?.data);
                }
            }catch(error){
                console.log(error);
            }
        }
        getRecipeDetails();
    }, []);

    return (
        <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="row-start-2 lg:row-start-auto">
                <div className="h-96 overflow-hidden rounded-xl group">
                    <img
                        src={recipeDetailsData?.recipe?.image_url}
                        className="w-full h-full object-cover block group-hover:scale-105 duration-300"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <span className="text-sm text-cyan-700 font-medium">
                    {recipeDetailsData?.recipe?.publisher}
                </span>
                <h3 className="font-bold text-2xl truncate text-black">
                    {recipeDetailsData?.recipe?.title}
                </h3>
                <div>
                    <button
                        onClick={() => handleAddToFavorites(recipeDetailsData?.recipe)}
                        className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
                    >
                        {favoritesList && favoritesList.length > 0 && favoritesList.findIndex(
                            (item) => item.id === recipeDetailsData?.recipe?.id
                        ) !== -1
                            ? "Remove from favorites"
                            : "Add to favorites"}
                    </button>
                </div>
                <div>
          <span className="text-2xl font-semibold text-black">
            Ingredients:
          </span>
                    <ul className="flex flex-col gap-3">
                        {recipeDetailsData?.recipe?.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                <span className="text-2xl font-semibold text-black">
                                  {ingredient.quantity} {ingredient.unit} {ingredient.description}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Details;