import express from 'express';
import { getSiteSettings, updateSiteSettings } from '../controllers/settingsController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getSiteSettings);
router.put('/', adminMiddleware(['super_admin', 'admin']), updateSiteSettings);

export default router;
