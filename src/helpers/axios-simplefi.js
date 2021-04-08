import axios from 'axios';

const nodeEnv = process.env.NODE_ENV;
const baseUrl = nodeEnv === 'production' ? 'https://simplefi-server.herokuapp.com' : 'http://localhost:3020';

const instance = axios.create({
  baseURL: baseUrl
});

export default instance;