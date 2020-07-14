import express from 'express';
const router = express.Router();
router.post('/api/users/signin', (req, res) => {
  res.send('Hi There from /api/users/signin');
});
export { router as signinRouter };
