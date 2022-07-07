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
      // waypoints: waypoints,
    },
    timeout: 1000,
  };

  return await client.directions(directionsRequest);
};
// Note: elevation API can consume multiple types. For now, let's either pass in
// an address, or latitude and longitude
const getElevationResults = async (route, routeDataResult) => {
  // assuming we only have 1 leg for now, and we aren't using waypoints
  let leg = route.legs[0];

  let legSteps = leg.steps;

  let elevationDataArray = [];

  legSteps.forEach(async (step) => {
    let distanceOfStep = step.distance.value;
    let suitableElevationSampleSize = distanceOfStep / 10; // to start, let's just do 1/10
    let startLocation = [step.start_location.lat, step.start_location.lng];
    let endLocation = [step.end_location.lat, step.end_location.lng];

    let elevationRequest = {
      params: {
        path: [startLocation, endLocation],
        samples: 10, // TODO: replace with ElevationSampleSize once done testing
        key: APIKey.APIKey,
      },
      timeout: 1000,
    };

    let elevationData = await client.elevation(elevationRequest);
    elevationData.data.results.forEach((coordinate) => {
      elevationDataArray.push(coordinate.elevation);
      console.log(elevationDataArray);
    });
  });

  return elevationDataArray;
};

module.exports = { getDirectionsResults, getElevationResults };

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
