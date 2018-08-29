import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Order from '../../components/Burger/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/errorHandler/errorHandler';
// import bodyClass from '../../index.css';
// To add class to body tag also see index.css
// document.body.classList.add(bodyClass.x);
// console.dir(document.body);

class BurgerBuilder extends Component {
  
  state = {
    showModal: false
  };
  
  updatePurchase = () => {
    const sum = Object.values(this.props.ingredients)
    .reduce((acc, cur) => acc + cur, 0);
    return sum > 0;
  };
  
  showModalHandler = () => {
    if(this.props.isAuthenticated)
     return this.setState({ showModal: true });
    this.props.history.push('/auth');
  };
  
  hideModalHandler = () => {
    this.setState({ showModal: false });
  };
 
  componentDidMount() {
    this.props.ingredientFetch();
  }
  
  render() {
    
    const disabledInfo = {}
    for(let ingredient in this.props.ingredients) {
      disabledInfo[ingredient] = this.props.ingredients[ingredient] <= 0;
    }
    
    let burger = this.props.error ? <p style={{ textAlign: 'center' }}>Sorry Something Went Wrong!</p> : <Spinner />;
    let orderSummary = null;

    if(this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            increase={this.props.ingredientAdd}
            decrease={this.props.ingredientRemove}
            price={this.props.totalPrice}
            disabled={disabledInfo}
            disableOrder={this.updatePurchase()}
            showModal={this.showModalHandler}
            authenticated={this.props.isAuthenticated} />
        </Fragment>
      );

      orderSummary = (
        <Order
          cancel={this.hideModalHandler}
          order={() => this.props.history.push('/checkout')}
          ingredients={this.props.ingredients}
          price={this.props.totalPrice.toFixed(2)} />
      );
    }

    return (
      <Fragment>
        <Modal show={this.state.showModal} hideModal={this.hideModalHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.burger.ingredients,
  totalPrice: state.burger.totalPrice,
  error: state.burger.error,
  isAuthenticated: state.auth.idToken !== null
});

const mapDispatchToProps = dispatch => ({
  ingredientAdd: (igKey) => dispatch(actions.addIngredient(igKey)),
  ingredientRemove: (igKey) => dispatch(actions.removeIngredient(igKey)),
  ingredientFetch: () => dispatch(actions.fetchIngredient())
});

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
