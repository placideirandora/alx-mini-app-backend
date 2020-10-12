import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();

/**
 * @param {object} user
 * @returns {object} User Token
 */
export const generateToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.userName,
    },
    process.env.SECRET_KEY,
    { expiresIn: '1d' }
  );

/**
 * @param {string} password
 * @returns {object} Hashed Password
 */
export const hashPassword = (password) => bcrypt.hashSync(password, 10);

/**
 *
 * @param {string} hashedPassword
 * @param {object} unHashedPassword
 * @return {object} password
 */
export const compareHashedPasswords = (unHashedPassword, hashedPassword) =>
  bcrypt.compareSync(unHashedPassword, hashedPassword);

