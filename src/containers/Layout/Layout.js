import React, { Fragment, Component } from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {

  state = {
    show: false
  }

  openSidedrawerHandler = () => {
    this.setState({show: true});
  }

  closeSidedrawerHandler = () => {
    this.setState({show: false});
  }

  render() {
    return (
      <Fragment>
        <Toolbar open={this.openSidedrawerHandler} />
        <Sidedrawer open={this.state.show} close={this.closeSidedrawerHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

export default Layout;
