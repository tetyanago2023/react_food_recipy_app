import {useParams} from "react-router-dom";
import {GlobalContext} from "../../context";
import {useContext, useEffect} from "react";

const Details = () => {
    const { id } = useParams();
    const {
        recipeDetailsData,
        setRecipeDetailsData,
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
                        className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
                    >
                        Add to Favorites
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Details;