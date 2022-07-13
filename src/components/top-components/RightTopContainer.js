import React, { useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Inputs from "./InputDiv";
import { Box, Button, Divider, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addDirections } from "../../actions/addDirections";
import { clearDirections } from "../../actions/clearDirections";
import { APIKey } from "../../apiKey";
import { getRouteResults } from "../../async-functions/async";

const containerStyle = {
  display: "inline-flex",
  width: "100%",
  height: "500px",
};

const center = {
  lat: 49.2606,
  lng: -123.246,
};

function MainMapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: APIKey,
    libraries: ["places"],
  });

  const [map, setMap] = React.useState(/** @type google.maps.Map */ (null));
  const [directions, setDirections] = React.useState(null);
  const dispatch = useDispatch();

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destRef = useRef();

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  async function calculateRoute() {
    let routeResults = await getRouteResults([
      originRef.current.value,
      destRef.current.value,
    ]);
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    // hand direction service the origin, destination and travel mode as well as options
    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.WALKING,
      provideRouteAlternatives: true,
    });
    console.log(results.routes);
    let directionArray = [];
    for (let i = 0; i < results.routes.length; i++) {
      let leg = results.routes[i];
      console.log(leg);
      directionArray.push({
        // distance in kilometers
        distance: (leg.legs[0].distance.value / 1000).toFixed(2),
        // duration in minutes
        duration: (leg.legs[0].duration.value / 60).toFixed(0),
        // addresses are strings
        startAddress: leg.legs[0].start_address,
        endAddress: leg.legs[0].end_address,
      });
      //console.log(directionArray);
    }
    dispatch(addDirections(directionArray));
    setDirections(results);
  }

  return isLoaded ? (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Inputs origin={originRef} destination={destRef} />
        <Button variant="contained" type="submit" onClick={calculateRoute}>
          Calculate Route
        </Button>
        <Divider variant="middle" />
        <Button variant="contained" onClick={() => dispatch(clearDirections())}>
          Clear Results
        </Button>
      </Grid>
      <Grid item xs={9}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
          {/* this will render any directions on the map when received from the server */}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}

export default React.memo(MainMapComponent);
