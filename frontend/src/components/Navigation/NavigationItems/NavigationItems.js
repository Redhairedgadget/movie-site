import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link='/'>Movie</NavigationItem>
        {props.isAuth
            ? <NavigationItem link='/profile'>Profile</NavigationItem>
            : null}
        {props.isAuth
            ? <NavigationItem link='/logout'>Log out</NavigationItem>
            : <NavigationItem link='/auth'>Register</NavigationItem>}
    </ul>
);

export default navigationItems;