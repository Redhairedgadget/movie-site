import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Button from '../../UI/Button/Button';

const movie = (props) => {

     const wantToSeeClickedHandler = () => {

         // Getting information about existing favorites of logged in user
        axios.get(`https://movie-site-dummy.firebaseio.com/favorites/${props.userId}.json`)
            .then(({data}) => {
                // Checking if user has any favorites at all
                if(data){
                    // Checking if user already has selected movie as a favorite
                    if(!data[props.movieId]){
                        // Push movieId to list and return list if movieId not found
                        data[props.movieId]=true;
                        return data
                    }else{
                        // Return movieId if movieId is found
                        return props.movieId
                    }
                }else{
                    // Create new set (using objects to replicate set) with movieId if user doesn't have any favorites
                    return {[props.movieId]: true}
                }
            })
            .then(response => {
                if(typeof response == 'object'){
                    // If array is received, push it as new list
                    axios.put(`https://movie-site-dummy.firebaseio.com/favorites/${props.userId}.json`, response)
                }else{
                    // If no array, delete movieId from existing list
                    axios.delete(`https://movie-site-dummy.firebaseio.com/favorites/${props.userId}/${response}.json`)
                }
            })

    }

    let buttons = null;

    if (props.isAuth){
        buttons = <Button clicked={wantToSeeClickedHandler}>Want to see</Button>
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
        userId: state.authReducer.userId
    }
}

export default connect(mapStateToProps)(movie)