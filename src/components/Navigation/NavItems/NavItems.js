import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';

const NavItems = (props) => {
  return (
    <ul className={classes.NavItems}>
      <NavItem active link="/">BurgerBuilder</NavItem>
      <NavItem link="/">Checkout</NavItem>      
    </ul>
  );
}

export default NavItems;
