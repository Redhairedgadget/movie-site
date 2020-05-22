import React, {useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import * as actions from '../../../store/actions/index';

const userForm = (props) => {
    const [userForm, changeUserForm] = useState({
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
            ...userForm,
            [controlName]: {
                ...userForm[controlName],
                value: event.target.value,
                valid: checkValidity( event.target.value, userForm[controlName].validation ),
                touched: true
            }
        };
        changeUserForm(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if(props.location.pathname==='/auth'){
            props.onSubmit(props.location.pathname, userForm.email.value, userForm.password.value, props.isSignup)
        }else{
            props.onSubmit(props.location.pathname, userForm.email.value, userForm.password.value)
        }
        /*console.log(props.submittedAction)*/
    }

    const formElementArray = [];
    for(let key in userForm){
        formElementArray.push({
            id: key,
            config: userForm[key]
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

    return(
        <form onSubmit={submitHandler}>
            {form}
            <Button btnType="Success">Submit</Button>
        </form>
    )
}

const mapDispatchToProps = dispatch => {
    return{
        onSubmit: (pathname, ...args) => {
            if(pathname==='/auth'){
                dispatch(actions.auth(...args))
            }
            if(pathname==='/profile'){
                dispatch(actions.updateUser(...args))
            }
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(userForm));

