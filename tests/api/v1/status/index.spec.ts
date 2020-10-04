import * as supertest from 'supertest';

let config = require(__dirname + '/../../../../src/cfg/index.ts').default,
  version = require(__dirname + '/../../../../src/api/v1/index.ts'),
  url = config.baseurl + ':' + config.api.port,
  api = supertest(url + '' + version.path);
//  data = require(__dirname + '/../../../../data');

describe('status#index', () => {
  test('Should return all users from API', done => {
    api
      .get('/users')
      .expect(200)
      .end((err, res) => {
        expect(typeof res.body).toBe('object');
        expect(res.body).toHaveProperty('status');
        done();
      });
  });

  test('Should create all users from API', done => {
    api
      .post('/users')
      .expect(201)
      .end((err, res) => {
        expect(typeof res.body).toBe('object');
        expect(res.body.status).toBe(201);
        done();
      });
  });
});
