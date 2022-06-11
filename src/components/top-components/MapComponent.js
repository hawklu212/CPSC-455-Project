import {useEffect, useRef, useState} from "react";


export default function MAP_COMPONENT({center, zoom}) {
    const ref = useRef(null);
    const [map, setMap] = useState();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {center, zoom}));
        }
    }, [ref, map]);

    console.log(ref)
    return <div ref={ref} id={"map"} style={{display: "inline-flex", height: `500px`, width: `500px`}}/>;

}