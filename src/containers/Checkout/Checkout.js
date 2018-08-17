import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Checkoutsummary from '../../components/CheckoutSummary/CheckoutSummary';
import DeliveryForm from './DeliveryForm/DeliveryForm';
import classes from './Checkout.css';

class Checkout extends Component {
  render() {
    return (
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
}

const mapStateToProps = state => ({
  ingredients: state.ingredients,
});

export default connect(mapStateToProps)(Checkout);
