import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
    const [searchParam, setSearchParam] = useState("");
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetailsData, setRecipeDetailsData] = useState(null);
    const [favoritesList, setFavoritesList] = useState([]);

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const res = await fetch(
                `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
            );

            const data = await res.json();
            console.log(data);

            if(data?.data?.recipes) {
                setRecipeList(data?.data?.recipes);
                setLoading(false);
                setSearchParam("");
                navigate("/");

            }
        }catch(error){
            console.log(error);
            setLoading(false);
            setSearchParam("");
        }
    }
    const handleAddToFavorites = (getCurrentItem) => {
        console.log(getCurrentItem);
        let cpyFavoritesList = [...favoritesList];
        const index = cpyFavoritesList.findIndex(item=> item.id === getCurrentItem.id)

        if(index === -1) {
            cpyFavoritesList.push(getCurrentItem)
        } else {
            cpyFavoritesList.splice(index)
        }

        setFavoritesList(cpyFavoritesList)
    }
    console.log(favoritesList, 'favoritesList');
    return (
        <GlobalContext.Provider value={{
            searchParam,
            loading,
            recipeList,
            setSearchParam,
            recipeDetailsData,
            setRecipeDetailsData,
            handleAddToFavorites,
            favoritesList,
            handleSubmit}}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalState;