import DETAILS from "./DETAILS";
import React, { useRef } from 'react'
export default function LEFT_BOTTOM_CONTAINER(){
    
    const refer1=useRef(null);
    const refer2=useRef(null);
    return (<span id="LEFT_BOTTOM" style={{"display":"inline-block"}}><DETAILS ref1={refer1} ref2={refer2}/></span>);
}