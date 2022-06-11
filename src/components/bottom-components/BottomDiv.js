import LEFT_BOTTOM_CONTAINER from "./LeftBottomContainer"
import RIGHT_BOTTOM_CONTAINER from "./RightBottomContainer"
export default function TOP_DIV(){
    return (<div id="BOTTOM_DIV" style={{display: "flex"}}><LEFT_BOTTOM_CONTAINER/><RIGHT_BOTTOM_CONTAINER/></div>);
}