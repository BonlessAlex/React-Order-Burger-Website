import React from 'react';
import classes from './ToolBar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/Navigationitems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

// In Desktop modal, <DrawerToggle/> component does not show. 
// In Mobile modal, <NavigationItems/> component does not show.

const toolbar = (props) => (
    <header className={classes.ToolBar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;