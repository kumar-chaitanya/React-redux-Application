import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICE = {
  salad: 0.20,
  bacon: 0.40,
  cheese: 0.32,
  meat: 0.63
};

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  building: false
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
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.igKey],
        building: true
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.igKey]: state.ingredients[action.igKey] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.igKey],
        building: true
      };
      case actionTypes.STORE_INGREDIENT: 
        return {
          ...state,
          ingredients: { ...action.ingredients },
          totalPrice: 0,
          error: false,
          building: false
        };
      case actionTypes.SET_ERROR:
        return {
          ...state,
          error: true
        }
    default:
      return state;
  }
};

export default reducer;