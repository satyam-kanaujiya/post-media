import { createContext, useContext, useReducer } from "react";
import Reducer from "./Reducer";
const initial_state = {
    user:null,
    isFetching:false,
    error:false
};

export const AuthContext = createContext(initial_state);

export const useAuthContext = () =>{
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(Reducer,initial_state);

    return(<AuthContext.Provider value={{user:state.user,isFetching:state.isFetching,error:state.error,dispatch}}>
        {children}
    </AuthContext.Provider>)
}