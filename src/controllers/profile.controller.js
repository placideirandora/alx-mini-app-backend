import { UserService } from '../data/services/user.service';
export class ProfileController {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} User Profile
   */
  static async getProfile(req, res) {
    try {
      const { email } = req.user;

      const user = await UserService.findUserByEmail(email);

      return res.status(200).json({
        message: 'Profile retrieved',
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Something went wrong while trying to retrieve the profile',
        error: err.message,
      });
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} User Profile
   */
  static async updateProfile(req, res) {
    try {
      const { email } = req.user;
      const { userName } = req.body;

      const userNameTaken = await UserService.findUserByUserName(userName);

      if (userNameTaken) {
        return res.status(409).json({
          message: `Username ${userName} is already taken. Use a different one.`,
        });
      }

      await UserService.updateUser(req.body, email);

      return res.status(201).json({
        message: 'Profile updated',
        data: {
          ...req.body,
          email,
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Something went wrong while trying to update the profile',
        error: err.message,
      });
    }
  }
}
