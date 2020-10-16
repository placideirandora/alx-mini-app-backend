import { User } from '../models/User';
import { AuthHelper } from '../../helpers/authHelper';

export class AuthService {
  static async registerUser(user) {
    user.password = AuthHelper.hashPassword(user.password);

    return await User.create(user);
  }

  static async loginUser(user, password) {
    const samePassword = AuthHelper.compareHashedPasswords(
      password,
      user.password
    );

    if (!samePassword) {
      return false;
    }

    const token = AuthHelper.generateToken(user);

    return { token, user };
  }

  static async changeUserPassword(credentials) {
    const {
      oldPassword,
      newPassword,
      user: { password, email },
    } = credentials;

    const samePassword = AuthHelper.compareHashedPasswords(
      oldPassword,
      password
    );

    if (!samePassword) {
      return false;
    }

    const newPasswordHash = AuthHelper.hashPassword(newPassword);

    await User.update({ password: newPasswordHash }, { where: { email } });

    return true;
  }
}
