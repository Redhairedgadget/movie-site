import React, {useState} from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler}/>
            <main>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default layout