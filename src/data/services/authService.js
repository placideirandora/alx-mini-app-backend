import { User } from '../models/User';
import {
  hashPassword,
  compareHashedPasswords,
  generateToken,
} from '../../helpers/authHelper';

export class AuthService {
  static async registerUser(user) {
    user.password = hashPassword(user.password);

    return await User.create(user);
  }

  static async loginUser(user, password) {
    const samePassword = compareHashedPasswords(password, user.password);

    if (!samePassword) {
      return false;
    }

    const token = generateToken(user);

    return { token, user };
  }

  static async changeUserPassword(credentials) {
    const {
      oldPassword,
      newPassword,
      user: { password, email },
    } = credentials;

    const samePassword = compareHashedPasswords(oldPassword, password);

    if (!samePassword) {
      return false;
    }

    const newPasswordHash = hashPassword(newPassword);

    await User.update({ password: newPasswordHash }, { where: { email } });

    return true;
  }
}
