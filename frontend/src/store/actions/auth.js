import axios from 'axios';

import * as actionTypes from './actionTypes';
import * as actions from './index';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const updateSuccess = (token) => {
    return{
        type: actionTypes.UPDATE_SUCCESS,
        idToken: token
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCp475x1cI7UQHT1ETJBK8xkPx6V5QfuYY';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCp475x1cI7UQHT1ETJBK8xkPx6V5QfuYY';
        }
        axios.post(url, authData)
            // TODO: adapt to your db
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })

    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
                dispatch(actions.getUserBookmarks(userId, 'favorites'));
                dispatch(actions.getUserBookmarks(userId, 'seen'));
            }
        }
    };
};

const userUpdateRequest = async (dispatch, updateData) => {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCp475x1cI7UQHT1ETJBK8xkPx6V5QfuYY'

    axios.post(url, updateData)
        .then(res=>{
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            console.log(res)
            dispatch(updateSuccess(res.data.idToken));
        }).catch(err=> dispatch(authFail(err.response.data.error)))
}

export const updateUser = (email, password) => {

    return dispatch => {
        let updateData = {
            returnSecureToken: true
        }

        if(email && !password){
            updateData.idToken = localStorage.token;
            updateData.email = email;
            userUpdateRequest(dispatch, updateData)
        }
        else if(password && !email){
            updateData.idToken = localStorage.token;
            updateData.password = password;
            userUpdateRequest(dispatch, updateData)
        }else{
            updateData.idToken = localStorage.token;
            updateData.email = email;
            userUpdateRequest(dispatch, updateData).then(res => {
                updateData = {
                    idToken: localStorage.token,
                    password: password,
                    returnSecureToken: true
                }
                userUpdateRequest(dispatch, updateData)
            }
            )
        }
    }
}