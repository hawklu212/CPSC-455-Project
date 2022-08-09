const defaultCards = [];
const directionsReducer = (directionsArray = defaultCards, action) => {
  switch (action.type) {
    case "ADD_DIRECTIONS":
      directionsArray = action.payload;
      return directionsArray;
    case "CLEAR_DIRECTIONS":
      directionsArray = [];
      return directionsArray;
    default:
      return directionsArray;
  }
};

export default directionsReducer;