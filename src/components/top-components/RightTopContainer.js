/*
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapComponent from "./MapComponent";
export default function RightTopContainer(){
    const center = {lat: 49.2606, lng: -123.2460};
    const zoom =14;
    const render = (status) => {
        return <h1>status</h1>
/!*        switch (status) {
            case Status.LOADING:
                return <h1>Loading</h1>;
            case Status.FAILURE:
                return <h1>Failure</h1>;
            case Status.SUCCESS:
                return <MAP_COMPONENT center={center} zoom={zoom} />;
        }*!/
    };

    return (
    <Wrapper apiKey={"AIzaSyBOwbCNPNPwnb_uyHDP1Fto7seTTwgM-1E"} render={render}>
        <MapComponent center={center} zoom={zoom}/>
    </Wrapper>
    );
}*/

import React, {useRef} from 'react'
import {GoogleMap, useJsApiLoader, DirectionsRenderer} from '@react-google-maps/api';
import Inputs from "./InputDiv";
import {Button} from "@mui/material";

const containerStyle = {
    width: '500px',
    height: '500px'
};

const center = {
    lat: 49.2606,
    lng: -123.2460
};



function MainMapComponent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyC3HlMXLDnjpcZRxYlp0MNQq1xy6VDZ6hE",
        libraries: ['places']
    })

    const [map, setMap] = React.useState(/** @type google.maps.Map */(null));
    const [directions, setDirections] = React.useState(null);

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef();
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destRef = useRef();

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    async function calculateRoute() {
        // eslint-disable-next-line no-undef
        const directionService = new google.maps.DirectionsService();
        // hand direction service the origin, destination and travel mode as well as options
        const results = await directionService.route(
            {
                origin: originRef.current.value,
                destination: destRef.current.value,
                // eslint-disable-next-line no-undef
                travelMode: google.maps.TravelMode.WALKING,
                provideRouteAlternatives: true
            }
        );
        setDirections(results);
        console.log(results[0]);
    }

    return isLoaded ? (
        <div>
            <Inputs origin={originRef} destination={destRef}/>
            <Button variant="contained" type="submit" onClick={calculateRoute}>Calculate Route</Button>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    mapTypeControl: false,
                    fullscreenControl: false
                }}
            >
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
                { /* this will render any directions on the map when received from the server */}
                {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
        </div>
    ) : <></>
}

export default React.memo(MainMapComponent)