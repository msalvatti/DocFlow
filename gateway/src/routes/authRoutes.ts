import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  
  res.json({ message: 'Login successful' });
});

export default router;