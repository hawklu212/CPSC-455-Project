//template
export const template=(exp=null,action)=>{
    switch(action.type){
        case "TEMPLATE_CASE":
            return action.payload;
        default:
            return exp;
    }
}

export const drawerState=(dS=false,action)=>{
    switch(action.type){
        case "TOGGLE_STATE":
            return !dS;
        default:
            return dS;
    }
}

export const loginState=(lS="",action)=>{
    switch(action.type){
        case "LOGIN":
            return ;
        default:
            return lS;
    }
}