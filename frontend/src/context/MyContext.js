import { createContext, useContext } from "react";

const MyContext = createContext();
const useMyContext = () => {
    return useContext(MyContext);
};

export { MyContext, useMyContext };