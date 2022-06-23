import Inputs from "./InputDiv";
import React, { useRef } from 'react'
export default function LeftTopContainer(){
    
    const refer1=useRef(null);
    const refer2=useRef(null);
    return (<span id="LEFT_TOP" style={{"display":"inline-flex"}}>

        <Inputs ref1={refer1} ref2={refer2}/>
    </span>);
}