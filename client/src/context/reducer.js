import { SET_CURRENT_USER, TOGGLE_THEME, LOGOUT_USER, CHANGE_PAGE, SET_CURRENT_USER_ERROR, IS_LOADING_TRUE, IS_LOADING_FALSE } from "./action";

const reducer = (state,action)=>{
    if(action.type === SET_CURRENT_USER){
        return {
            ...state,
            isLoading: false,
            user: action.payload
           
          };
    }

    if(action.type === "SET_CURRENT_USER_BEGIN"){
        return {
            ...state,
            isLoading: true
          };
    }
    if(action.type === IS_LOADING_TRUE){
        return {
            ...state,
            isLoading: true
          };
    }

    if(action.type === IS_LOADING_FALSE){
        return {
            ...state,
            isLoading: false
          };
    }

    if(action.type === 'UPDATE_POST_CONTENT'){
        return {
            ...state,
            postContent: action.payload
          };
    }

    if(action.type === SET_CURRENT_USER_ERROR){
        return {
            ...state,
            isLoading: false,
            user: null
          };
    }
    if(action.type === TOGGLE_THEME){
        const changedTheme = state.theme === 'dark' ? 'light' : 'dark'
        return {
            ...state,
            theme: changedTheme,
            isLoading: false,
        }
    }
    if(action.type === LOGOUT_USER){
        return{
            ...state,
            user: null
        }
    }

    if(action.type === CHANGE_PAGE){
        return{
            ...state,
            page: action.payload
        }
    }
    throw new Error(`no such action :${action.type}`);

}

export {reducer}