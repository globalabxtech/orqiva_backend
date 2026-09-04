import express from 'express';
import { getHeroSection, updateHeroSection } from '../controllers/heroController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getHeroSection);
router.put('/', adminMiddleware(['super_admin', 'admin']), updateHeroSection);

export default router;
