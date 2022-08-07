const savedRoutesReducer = (savedRoutesArray = [], action) => {
  switch (action.type) {
    case "SAVE_ROUTE":
      let newRoutesArray = [...savedRoutesArray];
      newRoutesArray.push(action.payload);
      return newRoutesArray;
    case "CLEAR_ROUTES":
      savedRoutesArray = [];
      return savedRoutesArray;
    default:
      return savedRoutesArray;
  }
};

export default savedRoutesReducer;
