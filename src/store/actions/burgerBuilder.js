import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

const storeIngredient = (ingredients) => ({
  type: actionTypes.STORE_INGREDIENT,
  ingredients: ingredients
});

const setError = () => ({
  type: actionTypes.SET_ERROR
});

export const addIngredient = (igKey) => ({
  type: actionTypes.ADD_INGREDIENT,
  igKey: igKey
});

export const removeIngredient = (igKey) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  igKey: igKey
});

export const fetchIngredient = () => 
{
  return async dispatch => {
    try {
      const response = await axios.get('/ingredients.json');
      dispatch(storeIngredient(response.data));
    } catch (error) {
      console.log(error);
      dispatch(setError());
    }
  }
};