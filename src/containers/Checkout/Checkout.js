import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Checkoutsummary from '../../components/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.css';
import DeliveryForm from './DeliveryForm/DeliveryForm';

class Checkout extends Component {
  render() {
    let checkout = <Redirect to="/" />;
    if(this.props.ingredients) {
      checkout = (
        <div className={classes.Checkout}>
          <Checkoutsummary
            ingredients={this.props.ingredients}
            cancel={() => this.props.history.goBack()}
            continue={() => this.props.history.replace('/checkout/contact-form')} />
          <Route
            path="/checkout/contact-form"
            component={DeliveryForm} />
        </div>
      );
    }
    return checkout;
  }
}

const mapStateToProps = state => ({
  ingredients: state.burger.ingredients
});

export default connect(mapStateToProps)(Checkout);
