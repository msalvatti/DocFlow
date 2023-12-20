import express from 'express';
import { profileMiddleware } from '../middlewares/profileMiddleware';
import { getRequestCertificatesbyUser, AddRequestCertificate, deleteRequestCertificatebyUser, updateRequestCertificatebyId } from '../controllers/certificateController';

const router = express.Router();

router.get('/user/all', getRequestCertificatesbyUser);

router.post('/', AddRequestCertificate);

router.delete('/:id', deleteRequestCertificatebyUser)

router.put('/:id', profileMiddleware, updateRequestCertificatebyId)

export default router;
