import React from 'react';
import Buger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1> hope it taste good</h1>
            <div style={{width:'300px', height:'300px', margin: 'auto'}}>
                <Buger ingredients={props.ingredients}/>
            </div>  
            <Button btnType="Danger">Cancel</Button>
            <Button btnType="Success">Continue</Button>
        </div>
    );
}

export default checkoutSummary;
