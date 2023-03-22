

const reducer = (state,action)=>{
    if(action.type === 'SET_CURRENT_USER'){
        return {...state,user:action.payload}
    }
    throw new Error(`no such action :${action.type}`);

}

export {reducer}