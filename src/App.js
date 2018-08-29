import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Order from './containers/Order/Order';
import Authenticate from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';
import { Route, Switch } from 'react-router-dom';

class App extends Component {

  componentDidMount() {
    this.props.checkAuthentication();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Order} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={Authenticate} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  checkAuthentication: () => dispatch(actions.checkAuthStatus())
});

export default withRouter(connect(null, mapDispatchToProps)(App));
