import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/Navigationitems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

// Set css classes, if props.open(the showSideDrawer state in Layout.js) is true, show sidedrawer.

// Backdrop: get the two props from sideDrawer
//           show: should we ative the Backdrop.    
//           clicked: a method, when we click Backdrop, hide the sideDrawer.

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    ); 
}

export default sideDrawer;