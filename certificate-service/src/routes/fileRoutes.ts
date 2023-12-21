import express from 'express';
import { getFile, addFile, deleteFile } from '../controllers/fileController';

const router = express.Router();

router.get('/:fileName', getFile);

router.post('/', addFile);

router.delete('/:fileName', deleteFile);

export default router;