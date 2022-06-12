import {useEffect, useRef} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { render } from "../../actions";

export default function MapComponent({center, zoom}) {
    const ref = useRef(null);
    const map = useSelector(state=>state.mapData);
    const dispatch=useDispatch();
    useEffect(() => {
        if (ref.current && !map) {
            dispatch(render({"center":JSON.stringify(center), "zoom":zoom,"ref":ref}));
        }
    }, [ref, map]);

    //console.log(ref)
    return <div ref={ref} id={"map"} style={{display: "inline-flex", height: `500px`, width: `500px`}}/>;

}