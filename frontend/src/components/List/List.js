import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import styles from './List.module.css';

import * as actions from '../../store/actions/index';
import Movie from './Movie/Movie';
import Spinner from '../UI/Spinner/Spinner';

const list = (props) => {

    useEffect(() => {
        props.onInitMovies()
    }, [])

    let list = <Spinner />;
    if(props.movieList){
        list = props.movieList.map(movie => {
            return <Movie key={movie.id} title={movie.title} poster={movie.poster} link={movie.link}/>
        })
    }

    return(
        <div className={styles.List}>
            {list}
        </div>
    )
}

const mapStateToProps = state => {
    return{
        movieList: state.movieReducer.movies,
        error: state.movieReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onInitMovies: () => dispatch(actions.fetchMovies())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(list);