const movieReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_POPULAR_MOVIES':
            return {
                ...state,
                populars: action.payload
            }
        case 'GET_DETAILS_MOVIE':
            return {
                ...state,
                details: action.payload
            }
        case 'GET_MATCHING_MOVIES':
            return {
                ...state,
                matchings: action.payload
            }
        case 'GET_RATING_MOVIES':
            return {
                ...state,
                ratings: action.payload
            }
        case 'POST_RATING_MOVIES':
            return {
                ...state,
                ratings: action.payload
            }
        case 'PUT_UPDATED_RATING':
            return {
                ...state,
                updated: action.payload
            }
        case 'CLEAN_RATING':
            return {
                ...state,
                ratings: {}         }
        default:
            return state;
    }
};

export default movieReducer;