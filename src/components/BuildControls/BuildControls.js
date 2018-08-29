import React, { Fragment } from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const BuildControls = (props) => {
  return (
    <Fragment>
     <p style={{textAlign: 'center'}}>Total Price: <strong>{Math.abs(props.price.toFixed(2))}</strong></p>
      <div className={classes.BuildControls}>
        {controls.map(control =>  {
          return <BuildControl 
                  key={control.label} 
                  label={control.label}
                  disabled={props.disabled[control.type]}
                  increase={() => props.increase(control.type)}
                  decrease={() => props.decrease(control.type)}/>
        })}
      </div>
      <button className={classes.OrderButton} 
        style={{
          position: 'relative',
          marginTop: '8px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
        disabled={!props.disableOrder}
        onClick={props.showModal}>{props.authenticated ? 'Order Now' : 'SIGIN Or SIGNUP To Order'}</button>
    </Fragment>
  );
}

export default BuildControls;
