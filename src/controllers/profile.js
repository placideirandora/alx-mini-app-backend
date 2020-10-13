import { User } from '../database/models/User';

export class ProfileController {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} User Profile
   */
  static async getProfile(req, res) {
    try {
      const { email } = req.user;

      const registeredUser = await User.findOne({ where: { email } });

      return res.status(201).json({
        message: 'Profile retrieved',
        data: {
          firstName: registeredUser.firstName,
          lastName: registeredUser.lastName,
          userName: registeredUser.userName,
          email: registeredUser.email,
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

      const userNameTaken = await User.findOne({
        where: { userName: req.body.userName },
      });

      if (userNameTaken) {
        return res.status(400).json({
          message: `Username ${req.body.userName} is already taken. Choose a different one.`,
        });
      }

      await User.update({ ...req.body }, { where: { email } });

      return res.status(201).json({
        message: 'Profile updated',
        data: {
          ...req.body,
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
