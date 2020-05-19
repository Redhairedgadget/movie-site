import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import styles from './List.module.css';

import * as actions from '../../store/actions/index';
import Movie from './Movie/Movie';
import Spinner from '../UI/Spinner/Spinner';

const list = (props) => {

    useEffect(() => {
        props.onInitMovies(props.list)
    }, [])

    let list = <Spinner />;
    if(props.movieList){
        list = props.movieList.map(movie => {
            return <Movie key={movie.id} movieId={movie.id} title={movie.title} poster={movie.poster} link={movie.link}/>
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
        error: state.movieReducer.error,
        userId: state.authReducer.userId,
        bookmarks: state.bookmarkReducer.bookmarks
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onInitMovies: (list) => dispatch(actions.fetchMovies(list)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(list);