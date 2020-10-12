import {
  signUpSchema,
  signInSchema,
  changePasswordSchema,
  updateProfileSchema,
} from '../helpers/schemas';

export const signUpSchemaValidator = (req, res, next) => {
  const { error } = signUpSchema.validate(req.body);

  if (error) {
    const message = error.details[0].message.replace(/\\|(")/g, '');

    return res.status(400).json({
      error: message,
    });
  }

  next();
};

export const signInSchemaValidator = (req, res, next) => {
  const { error } = signInSchema.validate(req.body);

  if (error) {
    const message = error.details[0].message.replace(/\\|(")/g, '');

    return res.status(400).json({
      error: message,
    });
  }

  next();
};

export const changePasswordSchemaValidator = (req, res, next) => {
  const { error } = changePasswordSchema.validate(req.body);

  if (error) {
    const message = error.details[0].message.replace(/\\|(")/g, '');

    return res.status(400).json({
      error: message,
    });
  }

  next();
};

export const updateProfileSchemaValidator = (req, res, next) => {
  const { error } = updateProfileSchema.validate(req.body);

  if (error) {
    const message = error.details[0].message.replace(/\\|(")/g, '');

    return res.status(400).json({
      error: message,
    });
  }

  next();
};
