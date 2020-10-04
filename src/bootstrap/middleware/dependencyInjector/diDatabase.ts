import cfg from '../../../cfg';
// import { createPool } from 'slonik';
import { createPool } from 'mysql';

const config = {
  host: cfg.db.host,
  user: cfg.db.user, //this is the db user credential
  database: cfg.db.database,
  password: cfg.db.password,
  port: cfg.db.port,
};

const interceptors = cfg.interceptors;

const pool = createPool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});
/*
pool.on('error', function(err, client) {
  console.error('idle client error', err.message, err.stack);
  if (err) {
    const logger: Logger = Container.get('logger');
    logger.error('500', {
      method: '',
      url: '',
      query: '',
      ip: '',
      error: err.message,
      stack: err.stack,
    });
  }
});
*/
export default pool;
