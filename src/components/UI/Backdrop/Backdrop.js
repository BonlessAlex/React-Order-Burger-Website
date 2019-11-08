import React from 'react';
import classes from './Backdrop.css';

// id props.show is true, display the Backdrop
// In css, the z-index of Backdrop show less than SideDrawer but larger than 0.
const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}/> : null
);

export default backdrop; 