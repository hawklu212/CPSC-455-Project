
export const mapData=(map=null,action)=>{
    switch(action.type){
        case 'RENDER':
            const center =JSON.parse(action.payload['center']);
            const zoom=action.payload['zoom'];
            const ref=action.payload['ref'];
            const view=new window.google.maps.Map(ref.current, {center, zoom});
            console.log(view)
            return view;
        default:
            return null;
    }
}