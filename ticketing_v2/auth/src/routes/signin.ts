import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { PasswordManager } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();
router.post(
  '/api/users/signin',
  [
    body('email').trim().isEmail().withMessage('Email must be valid.'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Please provide a password!'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError('Invalid Credentials');
    }
    const passwordsMatch = await PasswordManager.compare(
      user.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }
    // Generate JWT
    const userJWT = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
    // Store it on session object
    req.session = { jwt: userJWT };
    res.status(200).send(user);
  }
);

export { router as signInRouter };
