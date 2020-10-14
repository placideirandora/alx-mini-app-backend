import { User } from '../database/models/User';
import {
  hashPassword,
  compareHashedPasswords,
  generateToken,
} from '../helpers/auth';

export class AuthController {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} User Object
   */
  static async signUp(req, res) {
    try {
      const { email, userName, password } = req.body;

      const emailExists = await User.findOne({ where: { email } });
      const usernameExists = await User.findOne({ where: { userName } });

      if (emailExists) {
        return res.status(409).json({
          message: `Email ${email} is already taken. Use a different one.`,
        });
      }

      if (usernameExists) {
        return res.status(409).json({
          message: `Username ${userName} is already taken. Use a different one.`,
        });
      }

      req.body.password = hashPassword(password);

      const registeredUser = await User.create(req.body);

      return res.status(201).json({
        message: 'Registered',
        data: {
          firstName: registeredUser.firstName,
          lastName: registeredUser.lastName,
          userName: registeredUser.userName,
          email: registeredUser.email,
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Something went wrong while trying to sign you up',
        error: err.message,
      });
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} User Object with Token
   */
  static async signIn(req, res) {
    try {
      const { email, password } = req.body;

      const registeredUser = await User.findOne({ where: { email } });

      if (
        !registeredUser ||
        !compareHashedPasswords(password, registeredUser.password)
      ) {
        return res.status(401).json({
          message: `Incorrect Email or Password`,
        });
      }

      const token = generateToken(registeredUser);

      return res.status(200).json({
        message: 'Signed In',
        data: {
          token,
          user: {
            firstName: registeredUser.firstName,
            lastName: registeredUser.lastName,
            userName: registeredUser.userName,
            email: registeredUser.email,
          },
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Something went wrong while trying to sign you in',
        error: err.message,
      });
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} Message for Result
   */
  static async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const { email } = req.user;

      const registeredUser = await User.findOne({ where: { email } });

      if (!compareHashedPasswords(oldPassword, registeredUser.password)) {
        return res.status(403).json({
          message: 'Incorrect Old Password. Try again.',
        });
      }

      const newPasswordHash = hashPassword(newPassword);

      const updatedPassword = await User.update(
        { password: newPasswordHash },
        { where: { email } }
      );

      if (updatedPassword) {
        return res.status(200).json({
          message: 'Password changed',
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: 'Something went wrong while trying to change your password',
        error: err.message,
      });
    }
  }
}
