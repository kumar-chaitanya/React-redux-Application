import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.Hamburger} onClick={props.open}></div>
      <div style={{height: '80%'}}>
        <Logo /> 
      </div>
      <nav className={classes.DesktopOnly}>
        <NavItems />
      </nav>
    </header>
  );
}

export default Toolbar;
