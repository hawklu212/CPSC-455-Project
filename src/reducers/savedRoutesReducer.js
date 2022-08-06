const savedRoutesReducer = (savedRoutesArray = null, action) => {
  switch (action.type) {
    case "SAVE_ROUTE":
      savedRoutesArray = action.payload;
      return savedRoutesArray;
    case "CLEAR_ROUTES":
      savedRoutesArray = [];
      return savedRoutesArray;
    default:
      return savedRoutesArray;
  }
};

export default savedRoutesReducer;
