import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    selectedOption: 'settings',
}

export const setOption = (state, action) =>{
    return updateObject(state, {selectedOption: action.option})
}

const reducer = (state= initialState, action) =>{
    switch (action.type) {
        case actionTypes.SET_OPTION:
            return setOption(state, action)
        default:
            return state;
    }
}

export default reducer;