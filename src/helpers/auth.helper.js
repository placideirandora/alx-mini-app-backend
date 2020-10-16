import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();

export class AuthHelper {
  static generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.userName,
      },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static compareHashedPasswords(unHashedPassword, hashedPassword) {
    return bcrypt.compareSync(unHashedPassword, hashedPassword);
  }
}
