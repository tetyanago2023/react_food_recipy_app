import {createContext, useState} from "react";

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
    const [searchParam, setSearchParam] = useState("");
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);

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

            }
        }catch(error){
            console.log(error);
            setLoading(false);
            setSearchParam("");
        }
    }
    console.log(loading, recipeList);
    return (
        <GlobalContext.Provider value={{searchParam, loading, recipeList, setSearchParam, handleSubmit}}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalState;