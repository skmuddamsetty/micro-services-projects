import express, { Request, Response } from 'express';
const router = express.Router();
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be Valid!'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email in use!');
    }
    const user = User.build({ email, password });
    await user.save();
    // Generate JSONWebToken
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
    req.session = { jwt: userJwt };
    res.status(201).send(user);
    console.log('Creating a user...');
  }
);
export { router as signupRouter };
