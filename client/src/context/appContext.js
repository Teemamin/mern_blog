import Loading from "../components/Loading";
import { authFetch } from "../api/axiosDefault";
import { createContext, useContext, useReducer ,useEffect } from "react";
import {reducer} from './reducer'
import {json} from 'react-router-dom'
import { SET_CURRENT_USER, TOGGLE_THEME, LOGOUT_USER, CHANGE_PAGE,SET_CURRENT_USER_ERROR,IS_LOADING_TRUE, IS_LOADING_FALSE } from "./action";
export const AppContext = createContext()





const initialState = {
    user: null,
    theme: 'dark',
    page: 1,
    isLoading: false,
    postContent: ''
}
const AppContextProvider = ({children})=>{
    const [state, dispatchFn] = useReducer(reducer,initialState)

    authFetch.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if(error.response.status === 401){
            logoutUser()
        }
        return Promise.reject(error);
      });

      const getCurrentUser = async ()=>{
            try {
                dispatchFn({type: IS_LOADING_TRUE})
             const {data} = await authFetch.get('/auth/get-current-user')
             dispatchFn({type: SET_CURRENT_USER, payload: data})
            } catch (error) {
                dispatchFn({type: SET_CURRENT_USER_ERROR})
            }            
      }

    

    useEffect(()=>{
        document.body.className = state.theme;
        getCurrentUser()
    },[state.theme])

    const setCurrentUser = (user)=>{
        dispatchFn({type:SET_CURRENT_USER, payload:user})
    }

    const toggleTheme = ()=>{
        dispatchFn({type: IS_LOADING_TRUE})
        dispatchFn({type: TOGGLE_THEME})
    }

    const logoutUser = async ()=>{
        await authFetch.get('/auth/logout')
        dispatchFn({type: LOGOUT_USER})
     
    }

    const changePage = (newPage)=>{
        dispatchFn({type: CHANGE_PAGE, payload: newPage})
    }

    const setIsTrueLoading = ()=>{
        dispatchFn({type: 'IS_LOADING_TRUE'})
    }

    const setIsFalseLoading = ()=>{
        dispatchFn({type: 'IS_LOADING_FALSE'})
    }
 
    if(state.isLoading){
        return <Loading center/>
    }

    const handleChangePostContent = (value)=>{
        dispatchFn({type: 'UPDATE_POST_CONTENT', payload: value})
    }

    return(
        <AppContext.Provider value={
            {
                setCurrentUser,
                toggleTheme,
                logoutUser,
                changePage,
                setIsTrueLoading,
                setIsFalseLoading,
                handleChangePostContent,
                ...state
            }
            }>
            {children}</AppContext.Provider>
    )
}

const useAppContext = ()=>{
    return useContext(AppContext)
}

export {AppContextProvider, useAppContext}