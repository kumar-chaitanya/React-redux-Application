import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-react-a563b.firebaseio.com/'
});

export default instance;