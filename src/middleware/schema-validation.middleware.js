import {
  signUpSchema,
  signInSchema,
  changePasswordSchema,
  updateProfileSchema,
} from '../helpers/schema-validation.helper';

export class SchemaValidation {
  static validateSignUp(req, res, next) {
    const { error } = signUpSchema.validate(req.body);

    if (error) {
      const message = error.details[0].message.replace(/\\|(")/g, '');

      return res.status(400).json({
        error: message,
      });
    }

    next();
  }

  static validateSignIn(req, res, next) {
    const { error } = signInSchema.validate(req.body);

    if (error) {
      const message = error.details[0].message.replace(/\\|(")/g, '');

      return res.status(400).json({
        error: message,
      });
    }

    next();
  }

  static validatePasswordChange(req, res, next) {
    const { error } = changePasswordSchema.validate(req.body);

    if (error) {
      const message = error.details[0].message.replace(/\\|(")/g, '');

      return res.status(400).json({
        error: message,
      });
    }

    next();
  }

  static validateProfileUpdate(req, res, next) {
    const { error } = updateProfileSchema.validate(req.body);

    if (error) {
      const message = error.details[0].message.replace(/\\|(")/g, '');

      return res.status(400).json({
        error: message,
      });
    }

    next();
  }
}
