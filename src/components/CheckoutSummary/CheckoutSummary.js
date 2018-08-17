import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

const CheckoutSummary = (props) => {
  return (
    <div>
      <h1>Hope you like the Burger!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
      <Button btnType="Success" clicked={props.continue}>Continue</Button>
    </div>
  );
}

export default CheckoutSummary;
