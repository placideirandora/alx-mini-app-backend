import { AuthService } from '../data/services/auth.service';
import { UserService } from '../data/services/user.service';

export class AuthController {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} User Object
   */
  static async signUp(req, res) {
    try {
      const { email, userName } = req.body;

      const emailTaken = await UserService.findUserByEmail(email);

      if (emailTaken) {
        return res.status(409).json({
          message: `Email ${email} is already taken. Use a different one.`,
        });
      }

      const userNameTaken = await UserService.findUserByUserName(userName);

      if (userNameTaken) {
        return res.status(409).json({
          message: `Username ${userName} is already taken. Use a different one.`,
        });
      }

      const user = await AuthService.registerUser(req.body);

      return res.status(201).json({
        message: 'Registered',
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
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

      const user = await UserService.findUserByEmail(email);

      if (!user) {
        return res.status(401).json({
          message: `Incorrect Email`,
        });
      }

      const response = await AuthService.loginUser(user, password);

      if (!response) {
        return res.status(401).json({
          message: `Incorrect Password`,
        });
      }

      return res.status(200).json({
        message: 'Signed In',
        data: {
          token: response.token,
          user: {
            firstName: response.user.firstName,
            lastName: response.user.lastName,
            userName: response.user.userName,
            email: response.user.email,
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
      const { email } = req.user;

      const user = await UserService.findUserByEmail(email);

      req.body.user = user;

      const updatedPassword = await AuthService.changeUserPassword(req.body);

      if (!updatedPassword) {
        return res.status(400).json({
          message: 'Incorrect Old Password. Try again.',
        });
      }

      return res.status(200).json({
        message: 'Password changed',
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Something went wrong while trying to change your password',
        error: err.message,
      });
    }
  }
}
