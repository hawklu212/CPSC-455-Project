export default function Inputs(props){
    return (<span>
        <h1>From Input<textarea ref={props.ref1} onInput={()=>{auto_grow(props.ref1);}}></textarea></h1>
        <h1>To Input<textarea ref={props.ref2} onInput={()=>{auto_grow(props.ref2);}}></textarea></h1>
    </span>);
}

function auto_grow(referen) {
    if (referen.current!=null){
    referen.current.style.height = "20px";
    referen.current.style.height = (referen.current.scrollHeight)+"px";
    }
}