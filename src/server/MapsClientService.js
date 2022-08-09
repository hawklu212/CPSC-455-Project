const { Client, TravelMode } = require("@googlemaps/google-maps-services-js");

const APIKey = process.env.APIKEY || require("./apiKeyExpress").APIKey;
const { calculateStepScore } = require("./RouteProcessingService");
const ProfileModel = require("./database/profileSchema");

const client = new Client({});

const getDirectionsResults = async (orig, dest) => {
  let directionsRequest = {
    params: {
      key: APIKey,
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
const getElevationResults = async (route, userProfile) => {
  // const numberOfSamples = 10;
  // assuming we only have 1 leg for now, and we aren't using waypoints
  let legSteps = route.legs[0].steps;

  let elevationResults = {
    elevationDataArray: [],
    routeScore: 0,
    steepestIncline: null,
  };

  for (const step of legSteps) {
    let distanceOfStep = step.distance.value;
    const numberOfSamples = Math.floor(distanceOfStep/20);
    let subSampleDistance = distanceOfStep / numberOfSamples;
    let startLocation = [step.start_location.lat, step.start_location.lng];
    let endLocation = [step.end_location.lat, step.end_location.lng];

    let elevationRequest = {
      params: {
        path: [startLocation, endLocation],
        samples: numberOfSamples,
        key: APIKey,
      },
      timeout: 1000,
    };

    let elevationData = await client.elevation(elevationRequest);

    // calculateStepScore - take in elevationResults, elevationData, subSampleDistance and userProfile
    // - return nothing, update score in elevationResults
    await calculateStepScore(
      elevationResults,
      elevationData.data.results,
      subSampleDistance,
      userProfile
    );

    elevationData.data.results.forEach((coordinate) => {
      elevationResults.elevationDataArray.push(coordinate.elevation);
      // console.log(elevationResults.elevationDataArray);
    });
  }

  return elevationResults;
};

module.exports = { getDirectionsResults, getElevationResults };

//   .catch((e) => {
//     console.log(e.response.data.error_message);
//   });
