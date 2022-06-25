const defaultCards = [
    {
        distance: '3.28',
        duration: '44',
        startAddress: 'Vancouver, BC, Canada',
        endAddress: '855 12th Ave W #190, Vancouver, BC V5Z 1M9, Canada'
    },
    {
        distance: '3.19',
        duration: '43',
        startAddress: 'Vancouver, BC, Canada',
        endAddress: '855 12th Ave W #190, Vancouver, BC V5Z 1M9, Canada'
    },
    {
        distance: '3.69',
        duration: '50',
        startAddress: 'Vancouver, BC, Canada',
        endAddress: '855 12th Ave W #190, Vancouver, BC V5Z 1M9, Canada'
    }
]
const directionsReducer = (directionsArray = defaultCards, action) => {
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