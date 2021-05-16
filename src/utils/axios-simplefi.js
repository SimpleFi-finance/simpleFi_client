import axios from 'axios';

const nodeEnv = process.env.REACT_APP_NODE_ENV;
let baseUrl = 'http://localhost:3020';
if (nodeEnv === 'production') {
  baseUrl = 'https://api.simplefi.finance.com'
} else if (nodeEnv === 'staging') {
  baseUrl = 'https://stagingapi.simplefi.finance'
}

const instance = axios.create({
  baseURL: baseUrl,
  headers: {"Access-Control-Allow-Origin": "*"}
});

export default instance;