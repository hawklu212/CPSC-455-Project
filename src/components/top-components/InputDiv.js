import {Autocomplete} from '@react-google-maps/api';
import {Button} from "@mui/material";

export default function Inputs(props){
    return (<span>
        <Autocomplete>
                    <input type='text' placeholder='Origin' ref={props.origin}/>
        </Autocomplete>
        <Autocomplete>
                    <input type='text' placeholder='Destination' ref={props.destination}/>
        </Autocomplete>
{/*        <h1>From Input<textarea ref={props.ref1} onInput={()=>{auto_grow(props.ref1);}}></textarea></h1>
        <h1>To Input<textarea ref={props.ref2} onInput={()=>{auto_grow(props.ref2);}}></textarea></h1>*/}

    </span>);
}

function auto_grow(referen) {
    if (referen.current!=null){
    referen.current.style.height = "20px";
    referen.current.style.height = (referen.current.scrollHeight)+"px";
    }
}