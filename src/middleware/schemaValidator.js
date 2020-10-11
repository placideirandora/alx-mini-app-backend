import { userSchema } from '../helpers/schemas';

export const userSchemaValidator = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    const message = error.details[0].message.replace(/\\|(")/g, '');

    return res.status(400).json({
      error: message,
    });
  }

  next();
};
