import { User } from '../models/User';

export class UserService {
  static async findUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  static async findUserByUserName(userName) {
    return await User.findOne({ where: { userName } });
  }

  static async updateUser(newInfo, email) {
    await User.update({ ...newInfo }, { where: { email } });

    return true;
  }
}
