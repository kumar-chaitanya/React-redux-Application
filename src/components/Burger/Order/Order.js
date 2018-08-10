import React from 'react';
import Button from '../../UI/Button/Button';

const Order = ({ ingredients, cancel, order, price }) => {

  const orderSummary = Object.keys(ingredients)
    .map(igKey => {
      return <p key={igKey}><strong style={{ textTransform: 'capitalize' }}>{igKey}</strong> - {ingredients[igKey]}</p>
    });

  return (
    <div style={{ textAlign: 'center' }}>
      <h4>Order Summary</h4>
      {orderSummary}
      <p><strong>Total Price: {price}</strong></p>
      <p>Check Out?</p>
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Button btnType="Danger" clicked={cancel}>Cancel</Button>
        <Button btnType="Success" clicked={order}>Continue</Button>
      </div>
    </div>
  );
}

export default Order;
