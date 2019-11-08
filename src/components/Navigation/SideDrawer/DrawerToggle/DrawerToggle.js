import React from 'react';
import classes from './DrawerToggle.css';

// DrawerToggle only show in MOBILE mode. onClick listener control the sideDrawer.
// The onClick method pass through Layout -> ToolBar -> DrawerToggle. 
const drawerToggle = (props) => (
    <div onClick={props.clicked} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;