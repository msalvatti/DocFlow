import express from 'express';
import axios from 'axios';

const router = express.Router();
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const response = await axios.post(`${AUTH_SERVICE_URL}/api/auth/login`, { username, password });

    const token = response.data.token;

    res.json({ token });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error logging in (Axios):', error.message);
      res.status(error.response?.status || 500).json({ error: 'Error logging in' });
    } else {
      console.error('Error logging in:', (error as Error).message);
      res.status(500).json({ error: 'Error logging in' });
    }
  }
});

export default router;
