import { Service, Inject } from 'typedi';

@Service()
export default class usersService {
  constructor(@Inject('usersModel') private usersModel, @Inject('logger') private logger) {}
  public async getUsers() {
    try {
      let users = await this.usersModel.getApiData();
      return users;
    } catch (e) {
      throw e;
    }
  }
  public async storeUsers() {
    try {
      let users = await this.usersModel.storeApiData();
      return users;
    } catch (e) {
      throw e;
    }
  }
}
