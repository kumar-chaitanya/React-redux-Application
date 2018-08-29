import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-order';

export const purchaseSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseFail = (error) => {
  return {
    type: actionTypes.PURCHASE_FAIL,
    error: error
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const purchaseStart = (orderData, history, token) => {
  return async dispatch => {
    dispatch(purchaseInit());
    try {
      const response =  await axios.post(`/orders.json?auth=${token}`, orderData);
      dispatch(purchaseSuccess(response.data.name, orderData));
      history.push('/');
    } catch (error) {
      console.log(error);
      dispatch(purchaseFail(error));
    }
  };
};

export const orderInit = () => {
  return {
    type: actionTypes.FETCH_ORDER_INIT
  };
};

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: orders
  };
};

export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error: error
  };
};

export const fetchOrderInit = (token, userId) => {
  return async dispatch => {
    dispatch(orderInit());
    const orders = [];
    try {
      const queryParams = `auth=${token}&orderBy="userId"&equalTo="${userId}"`;
      const response = await axios.get(`/orders.json?${queryParams}`);
      for (let id in response.data) {
        orders.push({
          orderId: id,
          ...response.data[id],
        });
      }
      dispatch(fetchOrderSuccess(orders));
    } catch (error) {
      console.log(error);
      dispatch(fetchOrderFail(error));
    }
  }
}