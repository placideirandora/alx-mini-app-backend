import bcrypt from 'bcryptjs';

import { User } from '../database/models/User';

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

      console.log('VALUE: ', User);

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

      req.body.password = bcrypt.hashSync(password, 10);

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
}
