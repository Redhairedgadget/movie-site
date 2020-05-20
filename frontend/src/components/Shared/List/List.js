import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import styles from './List.module.css';

import * as actions from '../../../store/actions';
import Movie from './Movie/Movie';
import Spinner from '../../UI/Spinner/Spinner';

const list = (props) => {

    useEffect(() => {
        console.log(props.user);
        props.onInitMovies(props.list, props.user)
    }, [props.list])

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
        onInitMovies: (list, user) => dispatch(actions.fetchMovies(list, user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(list);