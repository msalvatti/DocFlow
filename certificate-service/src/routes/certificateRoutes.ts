import express from 'express';
import { profileMiddleware } from '../middlewares/profileMiddleware';
import { getRequestCertificates, AddRequestCertificate, deleteRequestCertificatebyId, updateRequestCertificatebyId } from '../controllers/certificateController';

const router = express.Router();

router.get('/', getRequestCertificates);

router.post('/', AddRequestCertificate);

router.delete('/:id', deleteRequestCertificatebyId)

router.put('/:id', profileMiddleware, updateRequestCertificatebyId)

export default router;
