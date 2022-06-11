import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MAP_COMPONENT from "./MapComponent";
export default function RIGHT_TOP_CONTAINER(){
    const center = {lat: 49.2606, lng: -123.2460};
    const zoom =14;
    const render = (status) => {
        return <h1>status</h1>
/*        switch (status) {
            case Status.LOADING:
                return <h1>Loading</h1>;
            case Status.FAILURE:
                return <h1>Failure</h1>;
            case Status.SUCCESS:
                return <MAP_COMPONENT center={center} zoom={zoom} />;
        }*/
    };

    return (
    <Wrapper apiKey={""} render={render}>
        <MAP_COMPONENT center={center} zoom={zoom}/>
    </Wrapper>
    );
}