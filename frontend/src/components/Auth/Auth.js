import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";

import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import styles from './Auth.module.css';
import UserForm from "../Shared/UserForm/UserForm";

const auth = (props) => {

    const [isSignup, setIsSignup] = useState(true);

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }

    let form = <UserForm isSignup={isSignup}/>

    if(props.loading){
        form = <Spinner/>
    }

    let errorMessage = null;

    if(props.error){
        errorMessage=(
            // TODO: adjust for your db
            <p>{props.error.message}</p>
        )
    }

    let authRedirect = null;
    if(props.isAuth){
        authRedirect = <Redirect to="/" />
    }

    return(
        <div className={styles.Auth}>
            {authRedirect}
            {errorMessage}
            {form}
            <Button clicked={switchAuthModeHandler}
                btnType="Danger">Switch to {isSignup? 'sign in': 'sign up'}
            </Button>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuth: state.authReducer.token !== null
    }
}



export default connect(mapStateToProps)(auth);