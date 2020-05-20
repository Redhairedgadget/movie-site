import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import styles from './NavigationItem.module.css';
import * as actions from "../../../../store/actions";

const navigationItem = (props) => (
    <li onClick={props.link==='/profile'? ()=> props.onProfile('settings'): null} className={styles.NavigationItem}>
        <NavLink to={props.link} exact activeClassName={styles.active}>{props.children}</NavLink>
    </li>
)

const mapDispatchToProps = dispatch => {
    return{
        onProfile: (option) => dispatch(actions.setOption(option)),
    }
}

export default connect(null, mapDispatchToProps)(navigationItem);