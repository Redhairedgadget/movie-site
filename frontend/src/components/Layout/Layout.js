import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <React.Fragment>
        <Toolbar/>
        <div>
            SideDrawer, backdrop
        </div>
        <main>
            {props.children}
        </main>
    </React.Fragment>
);

export default layout