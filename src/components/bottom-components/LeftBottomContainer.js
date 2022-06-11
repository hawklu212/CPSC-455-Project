import Details from "./Details";
import React, { useRef } from 'react'
export default function LeftBottomContainer(){
    
    const refer1=useRef(null);
    const refer2=useRef(null);
    return (<span id="LEFT_BOTTOM" style={{"display":"inline-block"}}><Details ref1={refer1} ref2={refer2}/></span>);
}