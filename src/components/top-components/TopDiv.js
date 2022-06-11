import LEFT_TOP_CONTAINER from "./LeftTopContainer"
import RIGHT_TOP_CONTAINER from "./RightTopContainer"
export default function TOP_DIV(){
    return (<div id="TOP_DIV" style={{display: "flex"}}>
        <LEFT_TOP_CONTAINER/>
        <RIGHT_TOP_CONTAINER/>
    </div>);
}