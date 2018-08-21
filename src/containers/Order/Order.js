import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    this.props.fetchOrders();
  }

  render() {
    let ordersList = <Spinner />;

    if(!this.props.loading) {
      ordersList = this.props.orders.map(order => <OrderItem {...order} key={order.orderId} />);
    }

    return (
      <div className={classes.Orders}>
        <h2>Your Orders</h2>
        {ordersList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(actions.fetchOrderInit())
});

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Order, axios));
