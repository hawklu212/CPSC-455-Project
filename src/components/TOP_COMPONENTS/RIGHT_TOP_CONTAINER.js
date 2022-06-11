import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MAP_COMPONENT from "./MAP_COMPONENT";
export default function RIGHT_TOP_CONTAINER(){
    // const API_KEY = ProcessInfo.processInfo.environment["API_KEY"];
    const center = {lat: 49.2606, lng: 123.2460};
    const zoom = 7;
    const render = (status) => {
        switch (status) {
            case Status.LOADING:
                return <h1>Loading</h1>;
            case Status.FAILURE:
                return <h1>Failure</h1>;
            case Status.SUCCESS:
                return <MAP_COMPONENT center={center} zoom={zoom} />;
        }
    };

    return (
    <Wrapper apiKey={""} render={render} />
    );

    return (<span id="RIGHT_TOP" style={{"display":"inline-block"}}><MAP_COMPONENT/></span>);
}