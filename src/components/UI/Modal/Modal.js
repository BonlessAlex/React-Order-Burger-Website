import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    // Update Model and the components inside it if the "show" prop is changed,
    // or the children component(ordersummary) change, show the loading spinner 
    shouldComponentUpdate (nextProps, nextState) { 
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate () {
        console.log('[willupdate]');
    }
    

    // Beneath the content component is a backdrop, if we clicked it, it will 
    // trigger method from BugerBuilder to set purchasing variable to false, hide 
    // <Modal /> component, back to ingredient selection step.

    // <div> after Backdrop contains an ordersummary.
    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal} 
                    style={{
                        transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)',
                        opacity: this.props.show ? '1': '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;