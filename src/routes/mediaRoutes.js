import express from 'express';
import { uploadMedia as uploadMediaHandler, getMedia, deleteMedia } from '../controllers/mediaController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';
import { uploadMedia } from '../middlewares/uploadMiddleware.js';
import { uploadLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/upload', uploadLimiter, uploadMedia.single('file'), uploadMediaHandler);
router.get('/', getMedia);
router.delete('/:id', adminMiddleware(['super_admin', 'admin']), deleteMedia);

export default router;
