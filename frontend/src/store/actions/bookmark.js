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

export const setUserBookmarks = (userId) => {
    return dispatch => {
        axios.get(`https://movie-site-dummy.firebaseio.com/favorites/${userId}.json`)
            .then(({data}) => {
                if(data){
                    localStorage.setItem('userBookmarks', data);
                }
            })
    }
}

export const addRemoveBookmark = (userId, movieId) => {

    return dispatch => {
        // Getting information about existing favorites of logged in user
        axios.get(`https://movie-site-dummy.firebaseio.com/favorites/${userId}.json`)
            .then(({data}) => {
                // Checking if user has any favorites at all
                if(data){
                    // Checking if user already has selected movie as a favorite
                    if(!data[movieId]){
                        // Push movieId to list and return list if movieId not found
                        data[movieId]=true;
                        return data
                    }else{
                        // Return movieId if movieId is found
                        return movieId
                    }
                }else{
                    // Create new set (using objects to replicate set) with movieId if user doesn't have any favorites
                    return {[movieId]: true}
                }
            })
            .then(response => {
                if(typeof response == 'object'){
                    // If array is received, push it as new list
                    axios.put(`https://movie-site-dummy.firebaseio.com/favorites/${userId}.json`, response);
                    dispatch(addBookmark());
                }else{
                    // If no array, delete movieId from existing list
                    axios.delete(`https://movie-site-dummy.firebaseio.com/favorites/${userId}/${response}.json`)
                    dispatch(removeBookmark());
                }
            })
    }
}