import React, { Component } from 'react';
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

  state = {
    orders: [],
    loading: true
  }

  async componentDidMount() {
    const orders = [];

    try {
      const response = await axios.get('/orders.json'); 
      for(let id in response.data) {
        orders.push({
          orderId: id,
          ...response.data[id],
        });
      }
      this.setState({ orders, loading: false });
    } catch(error) {
      console.log(error);
      this.setState({ loading: false });
    }
  }

  render() {
    let ordersList = <Spinner />;

    if(!this.state.loading) {
      ordersList = this.state.orders.map(order => <OrderItem {...order} key={order.orderId} />);
    }

    return (
      <div className={classes.Orders}>
        <h2>Your Orders</h2>
        {ordersList}
      </div>
    );
  }
}

export default errorHandler(Order, axios);
