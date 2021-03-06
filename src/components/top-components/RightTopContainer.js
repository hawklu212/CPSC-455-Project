import React, { useRef } from "react";
import Cookies from "js-cookie";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Inputs from "./InputDiv";
import { Button, Divider, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addDirections } from "../../actions/addDirections";
import { clearDirections } from "../../actions/clearDirections";
// import { APIKey } from "../../apiKey";
import { getRouteResults } from "../../async-functions/async";
import { changeRouteIndex } from "../../actions/changeRouteIndex";

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
  let APIKey=Cookies.get("map_id");
  const {isLoaded} = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: APIKey,
    libraries: ["places"],
  });
  const [map, setMap] = React.useState(/** @type google.maps.Map */ (null));
  const [directions, setDirections] = React.useState(null);
  const routeIndex = useSelector((state) => state.routeIndexReducer);

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
    const routeResults = await getRouteResults([
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

    const directionArray = [];
    for (let i = 0; i < routeResults.routes.length; i++) {
      const leg = routeResults.routes[i];
      directionArray.push({
        distance: (leg.totalDistance / 1000).toFixed(2),
        duration: (leg.totalDuration / 60).toFixed(0),
        startAddress: leg.startAddress,
        endAddress: leg.endAddress,
        routeIndex: leg.routeIndex,
        score: leg.score,
      });
    }
    directionArray.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));

    dispatch(addDirections(directionArray));
    setDirections(results);
    dispatch(changeRouteIndex(directionArray[0].routeIndex));
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
          {directions && (
            <DirectionsRenderer
              directions={directions}
              routeIndex={routeIndex}
            />
          )}
        </GoogleMap>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}

export default React.memo(MainMapComponent);
