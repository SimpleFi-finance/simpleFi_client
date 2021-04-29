import axios from 'axios';

const nodeEnv = process.env.NODE_ENV;
let baseUrl = 'http://localhost:3020';
if (nodeEnv === 'production') {
  baseUrl = 'https://simplefi-server.herokuapp.com'
} else if (nodeEnv === 'staging') {
  baseUrl = 'https://simplefi-server-development.herokuapp.com'
}

const instance = axios.create({
  baseURL: baseUrl
});

export default instance;