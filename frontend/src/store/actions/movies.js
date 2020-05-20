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

export const fetchMovies =(list, user) => {
    return (dispatch, getState) => {
        axios.get('https://movie-site-dummy.firebaseio.com/movies.json')
            .then(res=> {
                if(user){
                    const ids = getState().bookmarkReducer[list];
                    dispatch(setMovies(res.data.filter(el => {
                        return Object.keys(ids).includes(el.id.toString())
                    })))
                }else{
                    console.log(user);
                    dispatch(setMovies(res.data))
                }
                // console.log(res.data);
            })
            .catch(err => {
                dispatch(fetchMoviesFailed())
            })
    }
}