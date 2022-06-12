
export const mapData=(state=null,action)=>{
    switch(action.type){
        case 'RENDER':
            const center =action.payload['center'];
            const zoom=action.payload['zoom'];
            const ref=action.payload['ref'];
            const view=new window.google.maps.Map(ref.current, {center, zoom});
            return view;
        default:
            return state;
    }
}