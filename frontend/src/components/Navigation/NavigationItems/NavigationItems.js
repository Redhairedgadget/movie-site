import React from 'react';
import {connect} from 'react-redux';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import * as actions from "../../../store/actions";

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link='/'>Movies</NavigationItem>
        {props.isAuth
            ? <NavigationItem link='/profile'>Profile</NavigationItem>
            : null}
        {props.isAuth
            ? <NavigationItem link='/logout'>Log out</NavigationItem>
            : <NavigationItem link='/auth'>Register</NavigationItem>}
    </ul>
);


export default navigationItems;