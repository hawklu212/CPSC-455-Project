import LEFT_TOP_CONTAINER from "./LEFT_TOP_CONTAINER"
import RIGHT_TOP_CONTAINER from "./RIGHT_TOP_CONTAINER"
export default function TOP_DIV(){
    return (<div id="TOP_DIV" style={{display: "flex"}}>
        <LEFT_TOP_CONTAINER/>
        <RIGHT_TOP_CONTAINER/>
    </div>);
}