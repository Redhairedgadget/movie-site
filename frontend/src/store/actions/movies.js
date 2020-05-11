import axios from 'axios';

import * as actionTypes from './actionTypes';

export const setMovies = (movies) => {
    return{
        type: actionTypes.SET_MOVIES,
        movies
    }
}

export const fetchMoviesFailed = () => {
    return{
        type: actionTypes.FETCH_MOVIES_FAILED
    }
}

export const fetchMovies =() => {
    return dispatch => {
        axios.get('https://movie-site-dummy.firebaseio.com/movies.json')
            .then(res=> {
                // console.log(res.data);
                dispatch(setMovies(res.data))
            })
            .catch(err => {
                dispatch(fetchMoviesFailed())
            })
    }
}