import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

import { User } from '../database/models/User';

config();

export class TokenVerification {
  /**
   * This method verifies a token.
   * @param {object} req Request
   * @param {object} res Response
   * @param {object} next Pass to next method.
   * @returns {object} Error message
   */
  static verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;

    if (typeof bearerHeader === 'undefined' || !bearerHeader) {
      res.status(403).json({ error: 'Please log in or Register' });
    } else {
      const bearerHeaderArr = bearerHeader.split(' ');
      const token = bearerHeaderArr[1];

      jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
        if (error) {
          return res.status(403).json({ error: `${error.message}` });
        }

        const registeredUser = await User.findOne({
          where: { email: decoded.email },
        });

        if (registeredUser) {
          req.user = registeredUser;

          return next();
        }

        return res.status(403).json({
          status: 403,
          error: 'User not recognized. Please register and try again.',
        });
      });
    }
  }
}
