import React, {useState} from 'react';
import {connect} from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {withRouter} from "react-router-dom";
import styles from './Layout.module.css';

const layout = (props) => {
    const [showSideDrawer, changeShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = ()=>{
        changeShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        changeShowSideDrawer(!showSideDrawer)
    }

    return (
        <React.Fragment>
            <Toolbar
                isAuth={props.isAuth}
                drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer
                isAuth={props.isAuth}
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}/>
            <main className={styles.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.token !== null
    }
}

export default withRouter(connect(mapStateToProps)(layout))