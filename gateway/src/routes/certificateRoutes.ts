import express from 'express';
import axios, { AxiosError } from 'axios';

const router = express.Router();
const CERTIFICATE_SERVICE_URL = process.env.CERTIFICATE_SERVICE_URL;

function handleAxiosError(error: unknown, res: express.Response): void {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    console.error('Error communicating with the service (Axios):', axiosError.message);
    res.status(axiosError.response?.status || 500).json({ error: 'Error communicating with the service' });
  } else {
    console.error('Unexpected error:', (error as Error).message);
    res.status(500).json({ error: 'Unexpected error' });
  }
}

router.get('/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;

    const id: string = req.params.id;

    const response = await axios.get(`${CERTIFICATE_SERVICE_URL}/api/certificate/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    handleAxiosError(error, res);
  }
});

router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization;

    const search: string = req.query.search != null ? `?search=${req.query.search}` : '';

    const response = await axios.get(`${CERTIFICATE_SERVICE_URL}/api/certificate${search}`, {
      headers: {
        Authorization: token,
      },
    });

    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    handleAxiosError(error, res);
  }
});

router.post('/', async (req, res) => {
  try {
    const token = req.headers.authorization;

    const { certificate } = req.body;

    const response = await axios.post(`${CERTIFICATE_SERVICE_URL}/api/certificate`, { certificate }, {
      headers: {
        Authorization: token,
      },
    });

    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    handleAxiosError(error, res);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;

    const id: string = req.params.id;

    const response = await axios.delete(`${CERTIFICATE_SERVICE_URL}/api/certificate/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    handleAxiosError(error, res);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;

    const id: string = req.params.id;

    const { certificate } = req.body;

    const response = await axios.put(`${CERTIFICATE_SERVICE_URL}/api/certificate/${id}`, { certificate }, {
      headers: {
        Authorization: token,
      },
    });

    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    handleAxiosError(error, res);
  }
});

export default router;
