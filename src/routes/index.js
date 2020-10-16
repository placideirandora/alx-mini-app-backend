import { Router } from 'express';

import { AuthController } from '../controllers/authController';
import { ProfileController } from '../controllers/profileController';
import { SchemaValidation } from '../middleware/schemaValidator';
import { TokenVerification } from '../middleware/tokenVerifier';

export const indexRouter = Router();

indexRouter.post(
  '/auth/signup',
  SchemaValidation.validateSignUp,
  AuthController.signUp
);

indexRouter.post(
  '/auth/signin',
  SchemaValidation.validateSignIn,
  AuthController.signIn
);

indexRouter.patch(
  '/auth/change-password',
  TokenVerification.verifyToken,
  SchemaValidation.validatePasswordChange,
  AuthController.changePassword
);

indexRouter.get(
  '/profile',
  TokenVerification.verifyToken,
  ProfileController.getProfile
);

indexRouter.patch(
  '/profile',
  TokenVerification.verifyToken,
  SchemaValidation.validateProfileUpdate,
  ProfileController.updateProfile
);
