import React from 'react';
import {connect} from 'react-redux';
import Button from '../../UI/Button/Button';
import * as actions from '../../../store/actions/index';

const movie = (props) => {

    const wantToSeeClickedHandler = () => {
        props.onClickingBookmarkButton(props.userId, props.movieId, 'favorites')
    }

    const seenClickedHanlder = () => {
        props.onClickingBookmarkButton(props.userId, props.movieId, 'seen')
    }

    let buttons = null;

    if (props.isAuth){
        let favoriteButton = null;
        let seenButton = null;

        if(Boolean(props.favorites)){
            favoriteButton = <Button clicked={wantToSeeClickedHandler}>{props.movieId.toString() in props.favorites ? "Don't want to see anymore": "Want to see"}</Button>
        }else{
            favoriteButton = <Button clicked={wantToSeeClickedHandler}>Want to see</Button>
        }
        if(Boolean(props.seen)){
            seenButton = <Button clicked={seenClickedHanlder}>{props.movieId.toString() in props.seen ? "Haven't seen": "Seen"}</Button>
        }else{
            seenButton = <Button clicked={seenClickedHanlder}>Seen</Button>
        }

        buttons =
            <div>
                {favoriteButton}
                {seenButton}
            </div>
    }

    return(
        <div>
            <h3>{props.title}</h3>
            <a target='_blank'  rel="noopener noreferrer" href={props.link}>
                <img src={props.poster} alt=""/>
            </a>
            {buttons}
        </div>
    )
}

const mapStateToProps = state => {
    return{
        isAuth: state.authReducer.token !== null,
        userId: state.authReducer.userId,
        favorites: state.bookmarkReducer.favorites,
        seen: state.bookmarkReducer.seen
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onClickingBookmarkButton: (userId, movieId, bookmarkType) => dispatch(actions.addRemoveBookmark(userId, movieId, bookmarkType))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(movie)