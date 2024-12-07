import React,{useState, useContext, createContext} from "react";

const TempContext = createContext();

export const TemperatureProvider = ({children}) => {
    const [isCelcius, setIsCelcius] = useState(true);

    return (
        <TempContext.Provider value={{isCelcius, setIsCelcius}}>
            {children}
        </TempContext.Provider>
    )
};

export const useTemperature = () => useContext(TempContext);
