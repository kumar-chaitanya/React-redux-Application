import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const errorHandler = (MyComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorCloseHandler = () => {
      this.setState({ error: null});
    }

    render() {
      return (
        <Fragment>
          <Modal 
            show={this.state.error}
            hideModal={this.errorCloseHandler}>
              {this.state.error ? this.state.error.message: null}
          </Modal>
          <MyComponent {...this.props} />
        </Fragment>
      );
    }
  }
}

export default errorHandler;
