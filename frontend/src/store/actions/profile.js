import * as actions from './actionTypes';

export const setOption = (option) => {
    return{
        type: actions.SET_OPTION,
        option
    }
}