import axios from 'axios';

const nodeEnv = process.env.REACT_APP_NODE_ENV;
let baseUrl = 'http://localhost:3040';
let origin = '*'
if (nodeEnv === 'production') {
  baseUrl = 'https://simplefi-users-service.herokuapp.com/'
  origin = 'https://simplefi.finance.com/'
} else if (nodeEnv === 'staging') {
  baseUrl = 'https://simplefi-users-service-staging.herokuapp.com/'
  origin = 'https://staging.simplefi.finance/'
}

const instance = axios.create({
  baseURL: baseUrl,
  headers: {"Access-Control-Allow-Origin": origin}
});

export default instance;