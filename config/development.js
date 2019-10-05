require('dotenv').config();
module.exports = {
  server: {
    port: 5000
  },
  db: {
    host: '127.0.0.1',
    dbname: 'test',
    debug: false,
    options: {
      username: null,
      password: null,
      port: 27017
    }
  },
  secret: process.env.SECRET_KEY,
};