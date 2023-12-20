import express from 'express';
import { profileMiddleware } from '../middlewares/profileMiddleware';
import { getRequestCertificatesbyUser, AddRequestCertificate, deleteRequestCertificatesbyUser } from '../controllers/certificateController';

const router = express.Router();

router.get('/user/all', getRequestCertificatesbyUser);

router.post('/', AddRequestCertificate);

router.delete('/:id', deleteRequestCertificatesbyUser)

export default router;
