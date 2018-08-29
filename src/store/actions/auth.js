import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (authData) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: authData.idToken,
  userId: authData.localId
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error: error
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

export const authLogout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
}

export const auth = (email, password, isSignup) => {
  return async dispatch => {
    dispatch(authStart());
    const authData = { email, password, returnSecureToken: true };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCNdX4VpkilxOLJqdjgpCIbBukEkvaiZd0';
    if(!isSignup) 
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCNdX4VpkilxOLJqdjgpCIbBukEkvaiZd0';
    try {
      const response = await axios.post(url, authData);
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('userId', response.data.localId);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch(authSuccess(response.data));
      dispatch(authLogout(response.data.expiresIn));
    } catch (error) {
      dispatch(authFail(error.response.data.error));
    }
  }
};

export const checkAuthStatus = () => {
  return dispatch => {
    const idToken = localStorage.getItem('token');
    if (!idToken) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const localId = localStorage.getItem('userId');
        dispatch(authSuccess({ idToken, localId }));
        dispatch(authLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
      } else {
        dispatch(logout());
      }
    }
  }
};