import * as actionTypes from './action';

const INGREDIENT_PRICE = {
  salad: 0.20,
  bacon: 0.40,
  cheese: 0.32,
  meat: 0.63
};

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 0
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT: 
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.igKey]: state.ingredients[action.igKey] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.igKey]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.igKey]: state.ingredients[action.igKey] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.igKey]
      };
    default:
      return state;
  }
};

export default reducer;