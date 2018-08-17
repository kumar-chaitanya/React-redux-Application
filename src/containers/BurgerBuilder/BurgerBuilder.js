import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Order from '../../components/Burger/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/errorHandler/errorHandler';
// import bodyClass from '../../index.css';

const INGREDIENT_PRICE = {
  salad: 0.20,
  bacon: 0.40,
  cheese: 0.32,
  meat: 0.63
};

class BurgerBuilder extends Component {
  
  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: false,
    showModal: false,
    loading: false,
    error: false
  };
  
  updatePurchase = (ingredients) => {
    const sum = Object.values(ingredients)
    .reduce((acc, cur) => acc + cur, 0);
    this.setState({ purchasable: sum > 0 });
    
    // To add class to body tag also see index.css
    // document.body.classList.add(bodyClass.x);
    // console.dir(document.body);
  };
  
  showModalHandler = () => {
    this.setState({ showModal: true });
  };
  
  hideModalHandler = () => {
    this.setState({ showModal: false });
  };
  
  continuePurchaseHandler = () => {
    const query = [];
    for(let key in this.state.ingredients) {
      query.push(`${encodeURIComponent(key)}=${this.state.ingredients[key]}`);
    }
    query.push(`totalPrice=${this.state.totalPrice}`);
    this.props.history.push('/checkout?' + query.join('&'));
  };
  
  increaseIngredient = (ingredient) => {
    let newList = {
      ...this.state.ingredients
    };
    
    newList[ingredient] += 1;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICE[ingredient];
    this.setState({ ingredients: newList, totalPrice: newPrice });
    this.updatePurchase(newList);
  }
  
  decreaseIngredient = (ingredient) => {
    let newList = {
      ...this.state.ingredients
    };
    
    let newPrice = this.state.totalPrice;
    
    if(newList[ingredient] - 1 < 0) {
      newList[ingredient] = 0;
    } else {
      newList[ingredient] -= 1;
      newPrice = this.state.totalPrice - INGREDIENT_PRICE[ingredient];
    }
    
    this.setState({ ingredients: newList, totalPrice: newPrice });
    this.updatePurchase(newList);    
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/ingredients.json');
      let purchasable = false;
      for(let key in response.data) {
        if(response.data[key])
          purchasable = true;
      }
      this.setState({ ingredients: response.data, purchasable: purchasable });
    } catch (error) {
      console.log(error);
      this.setState({ error: true });
    }
  }
  
  render() {
    
    const disabledInfo = {}
    for(let ingredient in this.state.ingredients) {
      disabledInfo[ingredient] = this.state.ingredients[ingredient] <= 0;
    }
    
    let burger = this.state.error ? <p style={{ textAlign: 'center' }}>Sorry Something Went Wrong!</p> : <Spinner />;
    let orderSummary = null;

    if(this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            increase={this.increaseIngredient}
            decrease={this.decreaseIngredient}
            price={this.state.totalPrice}
            disabled={disabledInfo}
            disableOrder={this.state.purchasable}
            showModal={this.showModalHandler} />
        </Fragment>
      );

      orderSummary = (
        <Order
          cancel={this.hideModalHandler}
          order={this.continuePurchaseHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice.toFixed(2)} />
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

export default errorHandler(BurgerBuilder, axios);
