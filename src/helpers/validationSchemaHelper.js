import Joi from 'joi';

export const signUpSchema = Joi.object().keys({
  firstName: Joi.string().max(30).trim().required(),
  lastName: Joi.string().max(30).trim().required(),
  userName: Joi.string().max(30).trim().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).trim().required(),
  password: Joi.string().max(30).trim().required(),
});

export const signInSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).trim().required(),
  password: Joi.string().trim().required(),
});

export const changePasswordSchema = Joi.object().keys({
  oldPassword: Joi.string().trim().required(),
  newPassword: Joi.string().trim().required(),
});

export const updateProfileSchema = Joi.object().keys({
  firstName: Joi.string().max(30).trim().required(),
  lastName: Joi.string().max(30).trim().required(),
  userName: Joi.string().max(30).trim().required(),
});
