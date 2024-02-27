import {createContext, useState} from "react";

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
    const [searchParam, setSearchParam] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        try{
            const res = await fetch(
                `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
            );

            const data = await res.json();
            console.log(data);


        }catch(error){
            console.log(error);
        }
    }

    return (
        <GlobalContext.Provider value={{searchParam, setSearchParam, handleSubmit}}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalState;