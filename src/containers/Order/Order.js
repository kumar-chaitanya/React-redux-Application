import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions';
import axios from '../../axios-order';
import errorHandler from '../../hoc/errorHandler/errorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Order.css';

const OrderItem = ({orderData, ingredients, orderId, price}) => {
  const items = Object.keys(ingredients).map(igKey => (
    <span key={igKey} className={classes.OrderItem}>{igKey} ({ingredients[igKey]})</span>
  ));
  return (
    <div className={classes.Order}>
    {items}
    <h4>Order ID {orderId}</h4>
    <h4>Total Price - {price}</h4>
    <h4>Delivery Details</h4>
    {Object.keys(orderData).map(id => <p style={{ textTransform: 'capitalize' }} key={id}>{id} - {orderData[id]}</p>)}
    </div>
  );
}

export class Order extends Component {
  
  componentDidMount() {
    if(this.props.isAuthenticated)
      this.props.fetchOrders(this.props.token, this.props.userId);
    return;
  }
  
  render() {
    let ordersList = <Spinner />;
    
    if(!this.props.loading) {
      ordersList = this.props.orders.map(order => <OrderItem {...order} key={order.orderId} />);
    }
    
    let authRedirect = null;
    if(!this.props.isAuthenticated)
    authRedirect = <Redirect to="/auth" />;
    
    return (
      <div className={classes.Orders}>
        {authRedirect}
        <h2>Your Orders</h2>
        {ordersList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.idToken,
  isAuthenticated: state.auth.idToken !== null,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: (token, userId) => dispatch(actions.fetchOrderInit(token, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Order, axios));
