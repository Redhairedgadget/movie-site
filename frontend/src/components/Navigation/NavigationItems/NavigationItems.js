import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link='/'>Movie</NavigationItem>
        <NavigationItem link='/profile'>Profile</NavigationItem>
        <NavigationItem link='/auth'>Register</NavigationItem>
    </ul>
);

export default navigationItems;