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
const getElevationResults = async (route) => {
  // assuming we only have 1 leg for now, and we aren't using waypoints
  let legSteps = route.legs[0].steps;

  let elevationDataArray = [];

  for (const step of legSteps) {
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
  }

  return elevationDataArray;
};

module.exports = { getDirectionsResults, getElevationResults };

//   .catch((e) => {
//     console.log(e.response.data.error_message);
//   });
