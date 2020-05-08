import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link='/' active>Movie</NavigationItem>
        <NavigationItem link='/'>Profile</NavigationItem>
    </ul>
);

export default navigationItems;