require('dotenv').config();
module.exports = {
  server: {
    port: process.env.PORT || 3100
  },
  db: {
    host: process.env.DB_HOST,
    dbname: process.env.DB_NAME,
    debug: false,
    options: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT
    }
  },
  secret: process.env.SECRET_KEY,
};