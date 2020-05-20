import React, {useState} from 'react';

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
                valid: checkValidity( event.target.value, signInForm[controlName].validation ),
                touched: true
            }
        };
        changeUserForm(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        /*props.onAuth(signInForm.email.value, signInForm.password.value, isSignup)*/
    }
}

