
export const mapData=(map=null,action)=>{
    switch(action.type){
        case 'RENDER':
            const center =(action.payload['center']);
            const zoom=action.payload['zoom'];
            const ref=action.payload['ref'];
            return new window.google.maps.Map(ref.current, {center, zoom});
        default:
            return null;
    }
}