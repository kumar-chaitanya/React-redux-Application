import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/action';
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
    showModal: false,
    loading: false,
    error: false
  };
  
  updatePurchase = () => {
    const sum = Object.values(this.props.ingredients)
    .reduce((acc, cur) => acc + cur, 0);
    return sum > 0;
  };
  
  showModalHandler = () => {
    this.setState({ showModal: true });
  };
  
  hideModalHandler = () => {
    this.setState({ showModal: false });
  };
 
  // async componentDidMount() {
  //   try {
  //     const response = await axios.get('/ingredients.json');
  //     let purchasable = false;
  //     for(let key in response.data) {
  //       if(response.data[key])
  //         purchasable = true;
  //     }
  //     this.setState({ ingredients: response.data, purchasable: purchasable });
  //   } catch (error) {
  //     console.log(error);
  //     this.setState({ error: true });
  //   }
  // }
  
  render() {
    
    const disabledInfo = {}
    for(let ingredient in this.props.ingredients) {
      disabledInfo[ingredient] = this.props.ingredients[ingredient] <= 0;
    }
    
    let burger = this.state.error ? <p style={{ textAlign: 'center' }}>Sorry Something Went Wrong!</p> : <Spinner />;
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
            showModal={this.showModalHandler} />
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

    if(this.state.loading)
      orderSummary = <Spinner />;

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
  ingredients: state.ingredients,
  totalPrice: state.totalPrice
});

const mapDispatchToProps = dispatch => ({
  ingredientAdd: (igKey) => dispatch({ type: actionTypes.ADD_INGREDIENT, igKey: igKey }),
  ingredientRemove: (igKey) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, igKey: igKey })
});

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
