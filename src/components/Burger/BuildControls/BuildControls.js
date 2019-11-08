import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad', type: 'salad'},
    {label:'Bacon', type: 'bacon'},
    {label:'Cheese', type: 'cheese'},
    {label:'Meat', type: 'meat'},
];

// A component which contains BuildControl elements(1: label 2: Reduce Button 3: Add Button) 
// and an order button.
// If we click order button, the ordered function sent from BugerBuilder will trigger and 
// change the purchasing variable in BugerBuilder to true, <Model /> component will show.
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>

        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label}
                ingredientQuantity={props.ingredients[ctrl.type]} 
                label={ctrl.label} 
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}

        <button className={classes.OrderButton}
                disabled={!props.purchaseable}
                onClick={props.ordered}>Order Now</button> 
    </div>
);

export default buildControls;