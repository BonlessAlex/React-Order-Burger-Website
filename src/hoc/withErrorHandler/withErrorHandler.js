import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

// High level component to handle errors.
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        // set error as null, if there is an error, it will become true.
        state = {
            error: null
        }

        componentWillMount () {
            // a request has no error, just set the error state to null and return request.
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            // If there is an error in the response, set error state to error.
            this.resInterceptor = axios.interceptors.response.use(res => res, error=> {
                this.setState({error: error});
            });   
        }

        //remove the interceptors if we don't need BugerBuilder componemnt
        componentWillUnmount () {
            //console.log('will ummount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }


        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Auxiliary>
                    <Modal 
                        show={this.state.error} 
                        modalClosed = {this.errorConfirmedHandler}>
                        {/* if the error exist, show error message. */}
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </ Auxiliary >
            )
        }
    }
}

export default withErrorHandler;