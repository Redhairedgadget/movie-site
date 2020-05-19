import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';

const auth = (props) => {
    const [signInForm, changeSignInForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    })

    const [isSignup, setIsSignup] = useState(true);

    const checkValidity = (value, rules) => {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    };

    const inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...signInForm,
            [controlName]: {
                ...signInForm[controlName],
                value: event.target.value,
                valid: checkValidity( event.target.value, signInForm[controlName].validation ),
                touched: true
            }
        };
        changeSignInForm( updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(signInForm.email.value, signInForm.password.value, isSignup)
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }

    const formElementArray = [];
    for(let key in signInForm){
        formElementArray.push({
            id: key,
            config: signInForm[key]
        })
    }

    let form = formElementArray.map(formElement => (
        <Input key={formElement.id}
               elementType={formElement.config.elementType}
               elementConfig={formElement.config.elementConfig}
               value={formElement.config.value}
               invalid={!formElement.config.valid}
               shouldValidate={formElement.config.validation}
               touched={formElement.config.touched}
               changed={( event ) => inputChangedHandler( event, formElement.id )}
        />
    ))

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
            <form onSubmit={submitHandler} action="">
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
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

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);