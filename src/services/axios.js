import axios from 'axios';

export default axios.create({
  // baseURL: 'https://api-rest-node-sequelize.vercel.app',
  baseURL: 'http://localhost:3001',
});
