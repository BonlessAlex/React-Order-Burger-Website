import React from 'react';
import classes from './NavigationItem.css';

// {props.children} here is the content on the navigationitem label such as "Checkout".
const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <a 
            href={props.link}
            className={props.active ? classes.active : null}> {props.children}
        </a>
    </li>
);

export default navigationItem;