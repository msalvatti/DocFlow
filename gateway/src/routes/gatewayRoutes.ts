import express from 'express';
import authRoutes from './authRoutes';
import certificationRoutes from './certificationRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/certification', certificationRoutes);

export default router;
