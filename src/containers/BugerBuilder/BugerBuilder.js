import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


// Fixed price of each ingredient.
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.5,
    cheese: 1,
    meat: 2
}

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {}
    // }

    
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        
        // Set the ingredient to null, we will set the ingredients state dynamically from database. 
        //ingredients: null,

        totalPrice: 0,
        purchaseable: false,    //Is the buger has ingredient, has a price that larger than 0.
        purchasing: false,      //Is the ingredient selection step end the order button is clicked?
        loading: false,    
        error: false      
    }

    // ! changed
    // Input an ingrendients object, calculate the current sum of price.
    // if the sum > 0. set state variable purchaseable to true.
    updateBurgerchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum,el) => {
                return sum + el;
            },0);
        this.setState({purchaseable: sum > 0})
    }
    
    // Get initialized ingredient data from database.
    componentDidMount () {
        //axios.get('https://my-burger-4f40d.firebaseio.com/ingredients.json')
        //        .then(response => {
        //            this.setState({ingredients: response.data})
        //        })
        //        .catch(error => {
        //            this.setState({error: true})
         //       });

    }


    // Ingredient number plus one, update the state.
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updateBurgerchaseState(updatedIngredients);
    }

    // Ingredient number minus one, update the state.
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceReducion = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceReducion;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updateBurgerchaseState(updatedIngredients);
    }

    // The ingredient selection step is end, move to purchasing stage.
    purchasHandler = () => {
        this.setState({purchasing: true});
    }

    // Go back to the ingredient selection step.
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    // If we click the continue on the purchasing step, this method will be triggered.
    purchaseContinusHandler = () => {
        // before loading the order details information, set loading to true in order to show loading css"
        this.setState({loading: true});

        //alert("Continue");
        // Data that need to be sent to the server(database)
        const order = {
            ingredients: this.state.ingredients,
            price:this.state.totalPrice,
            customer: {
                name: 'Alex Tang',
                address: {
                    street: 'street one',
                    zipCode: '12345',
                    country: 'China'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'on foot'
        }

        // Send data to the server(database), set loading to false, 
        // set purchasing to false in order to close the Model and back to
        // Ingredient selection step.

        axios.post('/orders.json', order)
            .then(response => {
                    this.setState({loading:false, purchasing:false});
            })
            .catch(error => {
                this.setState({loading:false, purchasing:false});
            })
    }
    
    // 
    // <Buger />: fetch ingredients from the state. show the current BUGER. 
    // <BuildControl />: props --- add(), remove(), {disabledInfo}, totalPrice, purchasable(Boolean)
    //                             purchaseHandler().
    //
    // disableInfo: a copy of current ingredients object. the keys are the same, the value is 
    //              boolean values, if the value number of a ingredient equals to 0 or less.
    //              set it as false. that means the number of this ingredient can not be reduced now.


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        //disableInfo[key] contains a array, [bolean, bolean], first one control disable "less"
        // second one controls disabel "more".
        for(let key in disabledInfo) {
            disabledInfo[key] = [disabledInfo[key] <=0, disabledInfo[key] >=2]
        }

        // Because we are going to fetch ingredients state from the server database,
        // we set ordersummary as null and set buger componment and buildControl component
        // as a spinner.
        // If ingredients details are fetched sucessfully, initialize these component.
        let orderSummary = null;
        let burgerAndBuildControl = this.state.error ? <p>Ingredient can not be loaded</p> : <Spinner />;
        if( this.state.ingredients) {
            burgerAndBuildControl = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredients={this.state.ingredients}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled = {disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered = {this.purchasHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary 
                purchaseCancelHandler={this.purchaseCancelHandler}
                purchaseContinusHandler={this.purchaseContinusHandler}
                ingredients={this.state.ingredients} 
                totalPrice={this.state.totalPrice.toFixed(2)}/>
        }

        // If the order details are submitting, show <Spinner />
        if(this.state.loading){
            orderSummary = <Spinner />;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burgerAndBuildControl}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);