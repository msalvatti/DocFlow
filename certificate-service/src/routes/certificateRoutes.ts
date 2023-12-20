import express from 'express';
import { getCertificatesbyUser } from '../controllers/certificateController';

const router = express.Router();

router.get('/user/all', getCertificatesbyUser);

export default router;
