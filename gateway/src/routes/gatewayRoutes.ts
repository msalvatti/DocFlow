import express from 'express';
import authRoutes from './authRoutes';
import certificateRoutes from './certificateRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/certificate', certificateRoutes);

export default router;
