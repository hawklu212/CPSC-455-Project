const { Client, TravelMode } = require("@googlemaps/google-maps-services-js");

const APIKey = process.env.APIKEY || require("./apiKeyExpress").APIKey;
const { calculateStepScore } = require("./RouteProcessingService");

const client = new Client({});

const getDirectionsResults = async (orig, dest) => {
  let directionsRequest = {
    params: {
      key: APIKey,
      origin: orig,
      destination: dest,
      mode: TravelMode.walking,
      alternatives: true,
    },
    timeout: 1000,
  };

  return await client.directions(directionsRequest);
};

const getElevationResults = async (route, userProfile) => {
  let legSteps = route.legs[0].steps;

  let elevationResults = {
    elevationDataArray: [],
    routeScore: 0,
    steepestIncline: null,
  };

  for (const step of legSteps) {
    let distanceOfStep = step.distance.value;
    const numberOfSamples = 10;
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


    // update score in elevationResults
    await calculateStepScore(
      elevationResults,
      elevationData.data.results,
      subSampleDistance,
      userProfile
    );

    elevationData.data.results.forEach((coordinate) => {
      elevationResults.elevationDataArray.push(coordinate.elevation);
    });
  }

  return elevationResults;
};

module.exports = { getDirectionsResults, getElevationResults };


