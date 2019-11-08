import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}: {props.ingredientQuantity}</div>
        <button className={classes.Less} onClick={props.removed} disabled={props.disabled[0]}>Less</button>
        <button className={classes.More} onClick={props.added} disabled={props.disabled[1]}>More</button>
    </div>
);

export default buildControl;