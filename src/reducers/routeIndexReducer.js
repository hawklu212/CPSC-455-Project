const routeIndexReducer = (routeIndex = 0, action) => {
  switch (action.type) {
    case "CHANGE_ROUTE_INDEX":
      routeIndex = action.payload;
      return routeIndex;
    case "RESET_ROUTE_INDEX":
      routeIndex = 0;
      return routeIndex;
    default:
      return routeIndex;
  }
};

export default routeIndexReducer;
