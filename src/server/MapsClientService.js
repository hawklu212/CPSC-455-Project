const { Client } = require("@googlemaps/google-maps-services-js");
const APIKey = require("./apiKeyExpress");

const client = new Client({});

const getDirectionsResults = async (orig, dest, waypoints) => {
  let directionsRequest = {
    params: {
      key: APIKey.Key,
      origin: orig,
      destination: dest,
      mode: "WALKING",
      alternatives: true,
      waypoints: waypoints,
    },
    timeout: 1000,
  };
  return await client.directions(directionsRequest);
};
// Note: elevation API can consume multiple types. For now, let's either pass in
// an address, or latitude and longitude
const getElevation = async (location) => {
  let elevationRequest = {
    params: {
      locations: [location],
      key: APIKey.Key,
    },
    timeout: 1000,
  };

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

module.exports = { getDirectionsResults, getElevation };
