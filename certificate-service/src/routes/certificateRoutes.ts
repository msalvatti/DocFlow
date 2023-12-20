import express from 'express';
import { profileMiddleware } from '../middlewares/profileMiddleware';
import { getRequestCertificatesbyUser, AddRequestCertificate } from '../controllers/certificateController';

const router = express.Router();

router.get('/user/all', getRequestCertificatesbyUser);

router.post('/', AddRequestCertificate);

export default router;
