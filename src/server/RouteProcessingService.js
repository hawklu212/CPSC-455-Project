const calculateTotalElevation = (routeSummary, elevationResults) => {
  routeSummary.totalElevation =
    Math.max(...elevationResults) - Math.min(...elevationResults);
};

const calculateStepScore = async (
  elevationResults,
  elevationData,
  samplingDistance,
  userProfile
) => {

  let userMass = 60;
  if (userProfile.weight != null) {
    userMass = userProfile.weight;
  }

  let distancePref = userProfile.distancePreference;
  let rollingResistance = 1;

  for (let i = 0; i < elevationData.length - 2; i++) {
    let incline = calculateIncline(
      elevationData[i].elevation,
      elevationData[i + 1].elevation,
      samplingDistance
    );

    if (
      elevationResults.steepestIncline === undefined ||
      elevationResults.steepestIncline < incline
    ) {
      elevationResults.steepestIncline = incline;
    }

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
        preferenceMultiplier = 1;
        break;
    }

    if (incline < 0) {
      inclineFactor =
        userMass * samplingDistance * Math.tan(preferenceMultiplier * incline) -
        samplingDistance * rollingResistance;
    } else {
      inclineFactor =
        userMass * samplingDistance * Math.tan(preferenceMultiplier * incline) +
        samplingDistance * rollingResistance;
    }

    // We don't allow negatives for inclineFactor, so if negative set to zero
    if (inclineFactor < 0) {
      inclineFactor = 0;
    }

    let stepScore = samplingDistance * inclineFactor;
    elevationResults.routeScore += stepScore;
  }
};

const calculateIncline = (startElevation, endElevation, distance) => {
  let riseOverRun = (endElevation - startElevation) / distance;
  let inclineRadians = Math.atan(riseOverRun);
  let inclineDegrees = inclineRadians * (180 / 3.14159265);
  return inclineDegrees;
};

module.exports = { calculateTotalElevation, calculateStepScore };
