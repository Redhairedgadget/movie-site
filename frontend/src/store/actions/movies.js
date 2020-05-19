import axios from 'axios';

import * as actionTypes from './actionTypes';

export const setMovies = (movies) => {
    console.log(movies);
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

export const fetchMovies =(list) => {
    return dispatch => {
        axios.get('https://movie-site-dummy.firebaseio.com/movies.json')
            .then(res=> {
                if(list === 'all'){
                    dispatch(setMovies(res.data))
                }else{
                    dispatch(null)
                }
                // console.log(res.data);
            })
            .catch(err => {
                dispatch(fetchMoviesFailed())
            })
    }
}