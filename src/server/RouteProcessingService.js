// this file can hold functions for processing individual routes
// and filling in details of routeSummary
const calculateTotalElevation = (routeSummary, elevationResults) => {
  routeSummary.totalElevation =
    Math.max(...elevationResults) - Math.min(...elevationResults);
};

const calculateStepScore = async (elevationResults, elevationData, samplingDistance, userProfile) => {

  // set a default value for mass if not weight is indicated in user profile?
  let userMass = 60;
  if (userProfile.weight != null) {
    userMass = userProfile.weight;
  }

  // Individuals preference for what to weigh as more important in the score calculation. String value can be
  // one of "distance", "gradient", or a default value for both to be weighed equally
  let distancePref = userProfile.distancePreference;

  // In ideal world we would have an individual value for this, however in the absence of information on
  // individuals wheelchairs we keep the value of 1.
  let rollingResistance = 1;

  // loop through each subsection determining it's incline
  for (let i = 0; i < elevationData.length-2; i++) {
    let incline = calculateIncline(elevationData[i].elevation, elevationData[i+1].elevation, samplingDistance);

    // Set max incline if null, and update if slope is greater than the current steepestIncline
    if ((elevationResults.steepestIncline === undefined) || elevationResults.steepestIncline < incline) {
      elevationResults.steepestIncline = incline;
    }

    // calculate the inclineFactor for this step
    let inclineFactor = null;
    let preferenceMultiplier = 1;

    switch (distancePref) {
      // Consider shorter distances as more important (weigh incline less)
      case "distance":
        preferenceMultiplier = 0.5;
        break;
      // Consider shallower grades more important (weigh incline more heavily)
      case "gradient":
        preferenceMultiplier = 1.5;
        break;
      default:
        break;
    }

    // Calculate incline factor using user preference
    if (incline < 0) {
      inclineFactor = (userMass * samplingDistance * Math.tan(preferenceMultiplier * incline)) - (samplingDistance * rollingResistance);
    } else {
      inclineFactor = (userMass * samplingDistance * Math.tan(preferenceMultiplier * incline)) + (samplingDistance * rollingResistance);
    }

    // We don't allow negatives for inclineFactor, so if negative set to zero
    if (inclineFactor < 0) {
      inclineFactor = 0;
    }

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
