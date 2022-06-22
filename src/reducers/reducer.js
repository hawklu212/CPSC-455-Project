//template
export const template=(exp=null,action)=>{
    switch(action.type){
        case "TEMPLATE_CASE":
            return action.payload;
        default:
            return exp;
    }
}