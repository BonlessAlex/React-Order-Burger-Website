import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BugerBuilder from './containers/BugerBuilder/BugerBuilder';

import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  // Test unmount, interceptor remove sucessfully.
  /* state = {
    show: true
  };

  componentDidMount () {
    setTimeout(() => {
      this.setState({show:false})
    }, 5000);
  } */

  render() {
    return (
      <div >
        <Layout>
          <BugerBuilder/>
          <Checkout/>
        </Layout>
      </div>
    );
  }
}

export default App;
