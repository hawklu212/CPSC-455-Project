import INPUTS from "./INPUTS_DIV";
import React, { useRef } from 'react'
export default function LEFT_TOP_CONTAINER(){
    
    const refer1=useRef(null);
    const refer2=useRef(null);
    return (<span id="LEFT_TOP" style={{"display":"inline-block"}}><INPUTS ref1={refer1} ref2={refer2}/></span>);
}