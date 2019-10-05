import mongoose from 'mongoose';
import config from 'config';


export default async () => {
  mongoose.Promise = global.Promise;
  let dbUri;
  if (config.get('db.options.username')) {
    dbUri = `mongodb://${config.get('db.options.username')}:${encodeURIComponent(config.get('db.options.password'))}@${config.get('db.host')}:${config.get('db.options.port')}/${config.get('db.dbname')}`;
  } else {
    dbUri = `mongodb://${config.get('db.host')}:${config.get('db.options.port')}/${config.get('db.dbname')}`;
  }

  try {
    mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
  } catch (err) {
    mongoose.createConnection(dbUri);
  }

  const info = mongoose.connections[0];

  mongoose.connection
    // eslint-disable-next-line no-console
    .on('error', () => console.error('Unable to connect to database'))
    .on('close', () => console.log('Database connection closed.')) // eslint-disable-line no-console
    // eslint-disable-next-line no-console
    .once('open', () => console.log(`Connected to ${info.host}:${info.port}/${info.name}`));
};