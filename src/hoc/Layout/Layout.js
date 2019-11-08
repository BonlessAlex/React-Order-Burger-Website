import React, {Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';

import classes from './Layout.css';

import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    // Initialize the side drawer as hide.
    state = {
        showSideDrawer: false
    }

    // Hide the side drawer.
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    }
    
    // In mobile modal! a drawertoggler in the toolbar will show, this method is used to show or 
    // hide the sidedrawer. (All in mobile modal)
    drawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    // ToolBar: just pass the drawerToggleHandler to its children component who need it.

    // SideDrawer: closed: a method to hide the sideDrawer
    //             open: a prop, the current state of showSideDrawer

    // Main: BugerBuilder component.
    render() {
        return(
            <Auxiliary>
                <ToolBar drawerToggleClicked={this.drawerToggleHandler}/>
                
                <SideDrawer 
                    closed={this.sideDrawerClosedHandler}
                    open={this.state.showSideDrawer}/>

                <main className={classes.Content}>
                    {this.props.children}
                </main> 
            </Auxiliary>
        )
    }
}

export default Layout; 