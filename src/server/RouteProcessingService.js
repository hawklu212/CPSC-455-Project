// this file can hold functions for processing individual routes
// and filling in details of routeSummary
const calculateTotalElevation = (routeSummary, elevationResults) => {
  routeSummary.totalElevation =
    Math.max(...elevationResults) - Math.min(...elevationResults);
};

const calculateStepScore = async (elevationResults, elevationData, samplingDistance, userProfile) => {
  let userMass = userProfile.weight;
  // TODO: incorporate distancePref into the calculation
  let distancePref = userProfile.distancePreference;
  // TODO: use a better default rolling resistance
  let rollingResistance = 1;

  for (let i = 0; i < elevationResults.length-2; i++) {
    let incline = calculateIncline(elevationData[i], elevationData[i+1], samplingDistance);
    // Set max incline if null, and update if slope is greater than the current steepestIncline
    if (!elevationResults.steepestIncline || elevationResults.steepestIncline < incline) {
      elevationResults.steepestIncline = incline;
    }

    // calculate the inclineFactor for this step
    let inclineFactor = null;
    if (incline < 0) {
      inclineFactor = (userMass * samplingDistance * Math.tan(incline)) - (samplingDistance * rollingResistance);
    } else {
      inclineFactor = (userMass * samplingDistance * Math.tan(incline)) + (samplingDistance * rollingResistance);
    }

    if (inclineFactor < 0) {
      inclineFactor = 0;
    }

    // Calculate this step's score and add it to the current score in elevationResults
    let stepScore = samplingDistance * inclineFactor;
    elevationResults.routeScore += stepScore;
  }

}

// return incline in degrees
const calculateIncline = (startElevation, endElevation, distance) => {
  let riseOverRun = (endElevation - startElevation) / distance;
  let inclineRadians = Math.atan(riseOverRun);
  let inclineDegrees = inclineRadians/180;
  return inclineDegrees;
}

module.exports = { calculateTotalElevation, calculateStepScore };
