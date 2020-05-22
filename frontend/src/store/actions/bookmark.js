import axios from 'axios';

import * as actionTypes from './actionTypes';

export const addBookmark = () => {
    return{
        type: actionTypes.ADD_BOOKMARK
    }
}

export const removeBookmark = () => {
    return{
        type: actionTypes.REMOVE_BOOKMARK
    }
}

export const setUserBookmarks = (bookmarks, bookmarkType) => {
    return{
        type: actionTypes.SET_USER_BOOKMARKS,
        bookmarks,
        bookmarkType
    }
}

export const getUserBookmarks = (userId, bookmarkType) => {
    return dispatch => {
        axios.get(`https://movie-site-dummy.firebaseio.com/${bookmarkType}/${userId}.json`)
            .then(response => {
                if(response.data !== null && typeof response.data.isArray ==='undefined'){
                    dispatch(setUserBookmarks(response.data, bookmarkType))
                }else{
                    dispatch(setUserBookmarks(response.data, bookmarkType))
                }
            })
    }
}

export const addRemoveBookmark = (userId, movieId, bookmarkType) => {

    return dispatch => {
        // Getting information about existing favorites of logged in user
        axios.get(`https://movie-site-dummy.firebaseio.com/${bookmarkType}/${userId}.json`)
            .then(({data}) => {
                // Checking if user has any favorites at all
                if(data){
                    // Checking if user already has selected movie as a favorite
                    if(!data[movieId]){
                        // Push movieId to list and return list if movieId not found
                        data[movieId]=movieId;
                        return data
                    }else{
                        // Return movieId if movieId is found
                        return movieId
                    }
                }else{
                    // Create new set (using objects to replicate set) with movieId if user doesn't have any favorites
                    return {[movieId]: movieId}
                }
            })
            .then(response => {
                if(typeof response == 'object'){
                    // If array is received, push it as new list
                    axios.put(`https://movie-site-dummy.firebaseio.com/${bookmarkType}/${userId}.json`, response)
                        .then(res => dispatch(getUserBookmarks(userId, bookmarkType)));
                }else{
                    // If no array, delete movieId from existing list
                    axios.delete(`https://movie-site-dummy.firebaseio.com/${bookmarkType}/${userId}/${response}.json`)
                        .then(res => dispatch(getUserBookmarks(userId, bookmarkType)));
                }
            })
    }
}