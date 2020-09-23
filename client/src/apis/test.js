const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://testingexpressandreact.run.goorm.io',
});

export default instance