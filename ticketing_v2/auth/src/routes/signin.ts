import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

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
  (req: Request, res: Response) => {
    const { email, password } = req.body;
    res.send({});
  }
);

export { router as signInRouter };
