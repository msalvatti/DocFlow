import express from 'express';
import axios, { AxiosError } from 'axios';
import multer from 'multer';
import * as path from 'path';

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

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(upload.single('file'));

router.post('/upload/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;

    const id: string = req.params.id;

    const uploadedFile = req.file;

    if (!uploadedFile) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const arrayBuffer = uploadedFile.buffer.buffer.slice(
      uploadedFile.buffer.byteOffset,
      uploadedFile.buffer.byteOffset + uploadedFile.buffer.byteLength
    );

    const blob = new Blob([arrayBuffer], { type: uploadedFile.mimetype });

    const formData = new FormData();
    formData.append('file', blob, `${id}${path.extname(uploadedFile.originalname)}`);

    const response = await axios.post(
      `${CERTIFICATE_SERVICE_URL}/api/certificate/upload`, formData,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    handleAxiosError(error, res);
  }
});

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
