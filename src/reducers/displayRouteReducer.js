const displayRouteReducer = (routeToDisplay = ["", ""], action) => {
  switch (action.type) {
    case "DISPLAY_ROUTE":
      routeToDisplay = action.payload;
      return routeToDisplay;
    default:
      return routeToDisplay;
  }
};

export default displayRouteReducer;
