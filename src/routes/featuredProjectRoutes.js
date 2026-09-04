import express from 'express';
import {
  getFeaturedProject,
  updateFeaturedProject,
} from '../controllers/featuredProjectController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getFeaturedProject);
router.put('/', adminMiddleware(['super_admin', 'admin']), updateFeaturedProject);

export default router;
