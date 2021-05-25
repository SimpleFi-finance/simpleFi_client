import axios from 'axios';

const nodeEnv = process.env.REACT_APP_NODE_ENV;
let baseUrl = 'http://localhost:3030';
let origin = '*'
if (nodeEnv === 'production') {
  baseUrl = 'https://simpelfi-indexing-service.herokuapp.com/'
  origin = 'https://simplefi.finance.com/'
} else if (nodeEnv === 'staging') {
  baseUrl = 'https://simplefi-indexing-service-stag.herokuapp.com/'
  origin = 'https://staging.simplefi.finance/'
}

const instance = axios.create({
  baseURL: baseUrl,
  headers: {"Access-Control-Allow-Origin": origin}
});

export default instance;