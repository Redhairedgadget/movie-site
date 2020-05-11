import * as actionTypes from '../actions/actionTypes';

const initialState = {
    movies: null,
    error: false
}

 const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_MOVIES:
            return {
                ...state,
                movies: action.movies,
                error: false
            };
        case actionTypes.FETCH_MOVIES_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;