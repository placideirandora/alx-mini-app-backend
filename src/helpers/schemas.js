import Joi from 'joi';

export const signUpSchema = Joi.object().keys({
  firstName: Joi.string().max(30).required(),
  lastName: Joi.string().max(30).required(),
  userName: Joi.string().max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().max(30).required(),
});

export const signInSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
});
