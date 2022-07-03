import { Client } from "@googlemaps/google-maps-services-js";
import { APIKey } from "../../apiKey";

const client = new Client({});

export const getDirectionsResults = async (orig, dest) => {
  let directionsRequest = {
    params: {
      key: APIKey,
      origin: "",
      destination: "",
      mode: "walking",
      alternatives: true,
      //waypoints:
    },
    timeout: 1000,
  };
  return await client.directions(directionsRequest);
};
// Note: elevation API can consume multiple types. To keep things simple, let's stick with coordinates:
// i.e. in the form of: locations = "49.1,52.7"
// we can delete this comment later after everyone has read it
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
