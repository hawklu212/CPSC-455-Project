import React, {useRef} from 'react'
import {GoogleMap, useJsApiLoader, DirectionsRenderer} from '@react-google-maps/api';
import Inputs from "./InputDiv";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addDirections} from "../../actions/addDirections";

const containerStyle = {
    display: "inline-flex",
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
        googleMapsApiKey: "AIzaSyDvwRJY_4ws-EBa5qaIpuH9H_McBjRIK7Q",
        libraries: ['places']
    })

    const [map, setMap] = React.useState(/** @type google.maps.Map */(null));
    const [directions, setDirections] = React.useState(null);
    const dispatch = useDispatch();

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
        console.log(results.routes);
        let directionArray = [];
        for (let i = 0; i < results.routes.length; i++) {
            let leg = results.routes[i];
            console.log(leg);
            directionArray.push({
                // distance in meters
                distance: leg.legs[0].distance.value,
                // duration in seconds
                duration: leg.legs[0].duration.value,
                // addresses are strings
                startAddress: leg.legs[0].startAddress,
                endAddress: leg.legs[0].endAddress,
            })
            //console.log(directionArray);
        }
        //dispatch(addDirections(directionArray));
        setDirections(results);
    }

    return isLoaded ? (
        <div>
            <Inputs origin={originRef} destination={destRef}/>
            <Button variant="contained" type="submit" onClick={calculateRoute}>Calculate Route</Button>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={9}
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