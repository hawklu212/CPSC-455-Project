// this file can hold functions for processing individual routes
// and filling in details of routeSummary
const calculateTotalElevation = (routeSummary, elevationResults) => {
  routeSummary.totalElevation =
    Math.max(...elevationResults) - Math.min(...elevationResults);
};

// TODO: implement more calculation functions
// const calculateSteepestIncline = (routeSummary, elevationResults) => {

// }

module.exports = { calculateTotalElevation };
