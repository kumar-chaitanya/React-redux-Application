import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.concat({
          orderId: action.orderId,
          ingredients: { ...action.orderData.ingredients },
          orderData: { ...action.orderData.orderData }
        })
      };
    case actionTypes.PURCHASE_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.FETCH_ORDER_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...action.orders],
        loading: false
      };
    case actionTypes.FETCH_ORDER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
