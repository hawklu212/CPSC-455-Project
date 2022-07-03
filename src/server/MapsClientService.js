import { Client } from "@googlemaps/google-maps-services-js";
import { APIKey } from "../../apiKey";

const client = new Client({});

export const getDirectionsResults = async (orig, dest, waypoints) => {
  let directionsRequest = {
    params: {
      key: APIKey,
      origin: "",
      destination: "",
      // eslint-disable-next-line no-undef
      mode: google.maps.TravelMode.WALKING,
      alternatives: true,
      waypoints: waypoints,
    },
    timeout: 1000,
  };
  return await client.directions(directionsRequest);
};
// Note: elevation API can consume multiple types. For now, let's either pass in
// an address, or latitude and longitude
export const getElevation = async (location) => {
  let elevationRequest = {
    params: {
      locations: [location],
      key: APIKey,
    },
    timeout: 1000,
  };

  return await client.elevation(elevationRequest);
};
client
  .elevation({
    params: {
      locations: [{ lat: 45, lng: -110 }],
      key: "placeholderKey",
    },
    timeout: 1000, // milliseconds
  })
  .then((r) => {
    console.log(r.data.results[0].elevation);
  })
  .catch((e) => {
    console.log(e.response.data.error_message);
  });
