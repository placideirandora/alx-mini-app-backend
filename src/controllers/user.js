import { User } from '../database/models/User';
import {
  hashPassword,
  compareHashedPasswords,
  generateToken,
} from '../helpers/auth';

export class UserController {
  /**
   * @description User Registration
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
          error: `User with the email, ${email} is already registered. Use a different one`,
        });
      }

      if (usernameExists) {
        return res.status(409).json({
          error: `User with the username ${userName} is already registered. Use a different one`,
        });
      }

      req.body.password = hashPassword(password);

      const registeredUser = await User.create(req.body);

      return res.status(201).json({
        message: 'Registered successfully',
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
   * @description User Login
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
          error: `Incorrect Email or Password`,
        });
      }

      const token = generateToken(
        registeredUser.id,
        registeredUser.userName,
        registeredUser.email
      );

      return res.status(200).json({
        message: 'Signed In Successfully',
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
}
