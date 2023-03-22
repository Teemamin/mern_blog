import { createContext, useContext, useReducer } from "react";
import {reducer} from './reducer'
export const AppContext = createContext()

const initialState = {
    user: null
}
const AppContextProvider = ({children})=>{
    const [state, dispatchFn] = useReducer(reducer,initialState)

    const setCurrentUser = (user)=>{
        // console.log(user,'context')
        dispatchFn({type:'SET_CURRENT_USER', payload:user})
    }


    return(
        <AppContext.Provider value={{setCurrentUser}}>{children}</AppContext.Provider>
    )
}

const useAppContext = ()=>{
    return useContext(AppContext)
}

export {AppContextProvider, useAppContext}