import React, {useState, useEffect} from 'react';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

const auth = (props) => {
    {
        const [signInForm, changeSignInForm] = useState({
            controls: {
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
            },
            isSignup: true
        })

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
                ...signInForm.controls,
                [controlName]: {
                    ...signInForm.controls[controlName],
                    value: event.target.value,
                    valid: checkValidity( event.target.value, signInForm.controls[controlName].validation ),
                    touched: true
                }
            };
            changeSignInForm( { controls: updatedControls } );
        }

        const submitHandler = (event) => {
            event.preventDefault();
            props.onAuth(signInForm.controls.email.value, signInForm.controls.password.value)
        }

        const formElementArray = [];
        for(let key in signInForm.controls){
            formElementArray.push({
                id: key,
                config: signInForm.controls[key]
            })
        }

        const form = formElementArray.map(formElement => (
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

        return(
            <div className={styles.Auth}>
                <form onSubmit={submitHandler} action="">
                    {form}
                    <Button btnType="Success">Submit</Button>
                    <Button btnType="Danger">Switch to sign in</Button>
                </form>
            </div>
        )

    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(null, mapDispatchToProps)(auth);