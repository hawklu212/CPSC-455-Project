const { Client, TravelMode } = require("@googlemaps/google-maps-services-js");
const APIKey = require("./apiKeyExpress");

const client = new Client({});

const getDirectionsResults = async (orig, dest, waypoints) => {
  let directionsRequest = {
    params: {
      key: APIKey.APIKey,
      origin: orig,
      destination: dest,
      mode: TravelMode.walking,
      alternatives: true,
      waypoints: waypoints,
    },
    timeout: 1000,
  };

  return await client.directions(directionsRequest);
};
// Note: elevation API can consume multiple types. For now, let's either pass in
// an address, or latitude and longitude
const getElevationResults = async (route) => {
  let elevationRequest = {
    params: {
      path: [], //lat lon array, get from route.legs
      samples: 10, // need to dynamically calculate this later, maybe something like 1/10th of distance of leg
      key: APIKey.Key,
    },
    timeout: 1000,
  };

  // after calling client.elevation, we may want to await and return something else
  // we need the bounds in routes for the viewport
  // we need an array of elevation results so we can do calculations on it (e.g. find min)
  //

  // may actually need to call client.elevation for each leg within each step
  // may want to do this iteration here, or in outer function that calls getElevationRequest
  return await client.elevation(elevationRequest);
};
// client
//   .elevation({
//     params: {
//       locations: [{ lat: 45, lng: -110 }],
//       key: APIKey.APIKey,
//     },
//     timeout: 1000, // milliseconds
//   })
//   .then((r) => {
//     console.log(r.data.results[0].elevation);
//   })
//   .catch((e) => {
//     console.log(e.response.data.error_message);
//   });

module.exports = { getDirectionsResults, getElevationResults };
