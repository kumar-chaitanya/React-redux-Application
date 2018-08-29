import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';

const NavItems = (props) => {
  return (
    <ul className={classes.NavItems}>
      <NavItem link="/">BurgerBuilder</NavItem>
      {props.authenticated ? <NavItem link="/orders">Orders</NavItem> : null}
      {!props.authenticated ?
        <NavItem link="/auth">Authenticate</NavItem> :
        <NavItem link="/logout">Logout</NavItem>
      }      
    </ul>
  );
}

export default NavItems;
