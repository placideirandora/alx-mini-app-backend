import { Router } from 'express';

import { AuthController } from '../controllers/auth';
import { ProfileController } from '../controllers/profile';
import {
  signUpSchemaValidator,
  signInSchemaValidator,
  changePasswordSchemaValidator,
  updateProfileSchemaValidator,
} from '../middleware/schemaValidator';
import { TokenVerification } from '../middleware/tokenVerifier';

export const indexRouter = Router();

indexRouter.post('/auth/signup', signUpSchemaValidator, AuthController.signUp);

indexRouter.post('/auth/signin', signInSchemaValidator, AuthController.signIn);

indexRouter.patch(
  '/auth/change-password',
  TokenVerification.verifyToken,
  changePasswordSchemaValidator,
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
  updateProfileSchemaValidator,
  ProfileController.updateProfile
);
