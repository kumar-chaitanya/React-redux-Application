import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';
import classes from './Auth.css';

export class Auth extends Component {
  
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  inputChangedHandler = (event, ctrlName) => {
    const updatedControls = {
      ...this.state.controls,
      [ctrlName]: {
        ...this.state.controls[ctrlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[ctrlName].validation),
        touched: true
      }
    }

    this.setState({controls: updatedControls});
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.authenticate(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  changeAuthState = () => {
    const authState = !this.state.isSignup;
    this.setState({ isSignup: authState });
  }
  
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

    if(this.props.loading)
      form = <Spinner />;

    let errorMessage = null;
		if(this.props.error)
      errorMessage = this.props.error.message;
      
    let orderRedirect = null;
    if(this.props.isAuthenticated && this.props.building)
      orderRedirect = <Redirect to="/checkout" />;
    else if (this.props.isAuthenticated && !this.props.building)
      orderRedirect = <Redirect to="/" />;    

    return (
      <div className={classes.Authenticate}>
        {orderRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">{this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}</Button>
        </form>
        <Button btnType="Danger" clicked={this.changeAuthState}>{!this.state.isSignup ? 'Or SIGNUP' : 'Or SIGNIN'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.idToken !== null,
  building: state.burger.building
});

const mapDispatchToProps = dispatch => ({
  authenticate: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
