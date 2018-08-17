import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Checkoutsummary from '../../components/CheckoutSummary/CheckoutSummary';
import DeliveryForm from './DeliveryForm/DeliveryForm';
import classes from './Checkout.css';

class Checkout extends Component {

  state = {
    ingredients: null,
    totalPrice: 0
  }

  componentWillMount() {
    let ingredients = {};
    const query = new URLSearchParams(this.props.location.search);
    let totalPrice = 0;
    for(let param of query) {
      if(param[0] === 'totalPrice')
        totalPrice = param[1];
      else
        ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients, totalPrice });
  }

  render() {
    return (
      <div className={classes.Checkout}>
        <Checkoutsummary 
          ingredients={this.state.ingredients}
          cancel={() => this.props.history.goBack()}
          continue={() => this.props.history.replace('/checkout/contact-form')} />
        <Route 
          path="/checkout/contact-form" 
          render={
            (props) => 
            <DeliveryForm 
              ingredients={this.state.ingredients} 
              totalPrice={+this.state.totalPrice}
              {...props} />
            } />
      </div>
    );
  }
}

export default Checkout;
