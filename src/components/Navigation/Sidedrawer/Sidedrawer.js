import React, { Fragment } from 'react';
import classes from './Sidedrawer.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const Sidedrawer = (props) => {

  let styleClass = [classes.Sidedrawer, classes.Close];

  if(props.open) 
    styleClass = [classes.Sidedrawer, classes.Open];

  return (
    <Fragment>
      <Backdrop show={props.open} hide={props.close} />
      <div className={styleClass.join(' ')}>
        <div style={{height: '11%'}}>
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </Fragment>
  );
}

export default Sidedrawer;
