
const directionsReducer = (directionsArray = [], action) => {
    switch(action.type) {
        case 'ADD_DIRECTIONS':
            directionsArray = action.payload;
            return directionsArray;
        case 'CLEAR_DIRECTIONS':
            directionsArray = null;
            return directionsArray;
        default:
            return directionsArray;
    }
}

export default directionsReducer;