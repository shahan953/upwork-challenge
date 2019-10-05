import app from './cServer';
import config from 'config';
import cDatabase from './cDatabase';
require('dotenv').config();

const port = config.get('server.port');

// DB Connection
cDatabase();

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server running at port: ${port}`);
});
