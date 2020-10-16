import { Router } from 'express';

import { AuthController } from '../controllers/auth.controller';
import { ProfileController } from '../controllers/profile.controller';
import { SchemaValidation } from '../middleware/schema-validation.middleware';
import { TokenVerification } from '../middleware/token-verification.middleware';

export const router = Router();

router.post(
  '/auth/signup',
  SchemaValidation.validateSignUp,
  AuthController.signUp
);

router.post(
  '/auth/signin',
  SchemaValidation.validateSignIn,
  AuthController.signIn
);

router.patch(
  '/auth/change-password',
  TokenVerification.verifyToken,
  SchemaValidation.validatePasswordChange,
  AuthController.changePassword
);

router.get(
  '/profile',
  TokenVerification.verifyToken,
  ProfileController.getProfile
);

router.patch(
  '/profile',
  TokenVerification.verifyToken,
  SchemaValidation.validateProfileUpdate,
  ProfileController.updateProfile
);
