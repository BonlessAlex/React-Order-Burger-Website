import React, {Component}from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

//
class OrderSummary extends Component {

    //This can also be a functional component, this is for a test of the performance boosting.
    componentWillUpdate () {
        console.log('[OrderSummary Willupdate]');
    }

    render () {
        // Extract order details.
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey=> {
            return (
                <li  key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            );
        });
        return(
            <Aux>
                <h3>Your Order</h3>
                <p> a burger with following ingredients:</p>

                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price {this.props.totalPrice}</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelHandler}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinusHandler}>Continue</Button>
            </Aux>
        )
    }
}

export default OrderSummary;