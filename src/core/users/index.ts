import { Service, Inject } from 'typedi';
import { Pool } from 'mysql';
import axios from 'axios';

@Service('usersModel')
class usersModel {
  constructor(@Inject('db') private db: Pool) {}
  public async getApiData(): Promise<any> {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      return response.data;
    } catch (e) {
      throw e;
    }
  }
  public async storeApiData(): Promise<any> {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      let users = response.data;
      users.map(user => {
        if (user.address.suite.search('Suite') >= 0) {
          this.db.query(
            `call desafio.store_user('${user.name}', '${user.username}', '${user.email}', '${user.phone}',
            '${user.website}', '${user.address.street}', '${user.address.suite}', '${user.address.city}', '${
              user.address.zipcode
            }',
             ${user.address.geo.lat}, ${user.address.geo.lng}, '${user.company.name}', '${user.company.catchPhrase}',
            '${user.company.bs}', @user_id)`,
          );
        }
        return true;
      });
    } catch (e) {
      throw e;
    }
  }
}

export default usersModel;
