import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
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
        <Toolbar open={this.openSidedrawerHandler} authenticated={this.props.isAuthenticated} />
        <Sidedrawer 
          open={this.state.show} 
          close={this.closeSidedrawerHandler} 
          authenticated={this.props.isAuthenticated} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.idToken !== null
});

export default connect(mapStateToProps)(Layout);
