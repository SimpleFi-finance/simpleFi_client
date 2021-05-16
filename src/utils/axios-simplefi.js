import axios from 'axios';

const nodeEnv = process.env.REACT_APP_NODE_ENV;
let baseUrl = 'http://localhost:3020';
let origin = '*'
if (nodeEnv === 'production') {
  baseUrl = 'https://api.simplefi.finance.com'
  origin = 'https://simplefi.finance.com/'
} else if (nodeEnv === 'staging') {
  baseUrl = 'https://stagingapi.simplefi.finance'
  origin = 'https://staging.simplefi.finance/'
}

const instance = axios.create({
  baseURL: baseUrl,
  headers: {"Access-Control-Allow-Origin": origin}
});

export default instance;