import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    favorites: {},
    seen: {},
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_BOOKMARKS:
            if(action.bookmarkType === 'favorites'){
                return updateObject(state, {
                    error: null,
                    favorites: action.bookmarks
                });
            }else{
                return updateObject(state, {
                    error: null,
                    seen: action.bookmarks
                });
            }
        default:
            return state
    }
}

export default reducer;